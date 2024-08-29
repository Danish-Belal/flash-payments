"use server"
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { languages } from "countries-list";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
     APPWRITE_DATABASE_ID : DATABASE_ID,
     APPWRITE_USER_COLLECTION_ID : USER_COLLECTION_ID,
     APPWRITE_BANK_COLLECTION_ID : BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async({userId}: getUserInfoProps) =>{
     try {
          const {database} = await createAdminClient();

          const user = await database.listDocuments(
               DATABASE_ID!,
               USER_COLLECTION_ID!,
               [Query.equal('userId', [userId])]
          )

          return parseStringify(user.documents[0]);
          
     } catch (error) {
          console.log(error);
          
     }

}
export const signIn = async({email,password}: signInProps) =>{

     try{
          const { account } = await createAdminClient();
          const session = await account.createEmailPasswordSession(email, password);
          
          cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });
          // const signinUser = await account.createEmailPasswordSession(email,password);
          const signinUser = await getUserInfo({userId: session.userId})
          
          
          return parseStringify(signinUser);


     }catch(error){
          console.log(error);
          
     }
}
export const signUp = async ( {password , ...userData} : SignUpParams) =>{
     
     // console.log("In Signup");     
     const {email, firstName, lastName  } = userData;
     
     var aadharNumber;

     let newUserAccount;
     if (userData.ssn.length === 12) {
          aadharNumber = userData.ssn;
          userData.ssn = userData.ssn.slice(0, -3); // Remove the last 3 digits of the SSN
      }
      if (userData.postalCode.length === 6) {
          userData.postalCode = userData.postalCode.slice(0, -1); // Remove the last digit of the Pincode
      }
     try{

          const { account, database } = await createAdminClient();
          
          newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
          // console.log('Account Created', newUserAccount);
          
          if(!newUserAccount) throw new Error('Error creating user');
           console.log("USER DATA WHILE GOIN TO CRETE DWOLLA", userData);
          //  console.log("USER DATA WHILE GOING TO CREATE DWOLLA", ...Object.entries(userData));

           
          const dwollaCustomerUrl = await createDwollaCustomer({
               ...userData,
               type:'personal'
          });

          if(!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer');

          const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
          // console.log("dwolla Customer Id", dwollaCustomerId);
          
          const newUser = await database.createDocument(
               DATABASE_ID!,
               USER_COLLECTION_ID!,
               ID.unique(),
               {
                    ...userData,
                    userId: newUserAccount.$id,
                    dwollaCustomerId,
                    dwollaCustomerUrl,
                    aadharNumber
               }
          )

          
          const session = await account.createEmailPasswordSession(email, password);
          
          cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });

          // console.log("User",  newUser);
          
          return parseStringify(newUser);
          

     }catch (error) {
          console.error('Error', error);
          return { error: error}
     }

}


export async function getLoggedInUser() {
     try {
       const { account } = await createSessionClient();
       const result =  await account.get();
       const user = await getUserInfo({userId: result.$id})

       return parseStringify(user)
     } catch (error) {
       return null;
     }
   }
export async function loggedAccount(){
     try{
          const {account} = await createSessionClient();
          cookies().delete('appwrite-session');
          account.deleteSession('current');
          return true

     }catch(error){
          console.log(error);
          
     }
}

export const createLinkToken = async(user:User) =>{
     // console.log('Inside create link for plaid', user);
     
     try {
          const tokenParams = {
               user:{
                    client_user_id: user.$id
               },
               client_name: `${user.firstName} ${user.lastName}`,
               products: ['auth'] as Products[],
               language: 'en',
               country_codes: ['US'] as CountryCode[],
          }
          // console.log('Plaid token params' , tokenParams);
          

          const response = await plaidClient.linkTokenCreate(tokenParams);
          // console.log('PLaid response' , response);
          
          return parseStringify({linkToken: response.data.link_token});
          
     } catch (error) {
          console.log(error);
          
     }
}
export const createBankAccount = async({
     userId,
     accountId,
     bankId,
     fundingSourceUrl,
     accessToken,
     shareableId,
}: createBankAccountProps) =>{
     try {
          const {database} = await createAdminClient();
          const bankAccount = await  database.createDocument(
               DATABASE_ID!,
               BANK_COLLECTION_ID!,
               ID.unique(),
               {
                    userId,
                    bankId,
                    accountId,
                    accessToken,
                    fundingSourceUrl,
                    shareableId,
               }
          )

          return parseStringify(bankAccount);
     } catch (error) {
          console.log("got error while creating bank account", error);
          
          
     }

}
export const exchangePublicToken = async ({
     publicToken,
     user,
}: exchangePublicTokenProps) =>{
     try {
          // Exchange public token for access token and item id
          // console.log('Inside exhange public token function');
          
          const response = await plaidClient.itemPublicTokenExchange({
               public_token : publicToken
          });
          // console.log('Response inside Plaid exchanfe public token', response);
          
          const accessToken = response.data.access_token;
          const itemId = response.data.item_id;

          // Get the account information from Plaid using access token
          const accountResponse = await plaidClient.accountsGet({
               access_token: accessToken,
          })

          // Get the account Data.
          const accountData  = accountResponse.data.accounts[0];

          // create a processor token for Dwolla using the  access toekn and account
          const request: ProcessorTokenCreateRequest = {
               access_token: accessToken,
               account_id: accountData.account_id,
               processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum

          };

          const processorTokenRsponse = await plaidClient.processorTokenCreate(request);
          const processorToken = processorTokenRsponse.data.processor_token;

          // create a funding source url for the accout using Dwolla customer ID, processor token, and bank name
          const fundingSourceUrl = await addFundingSource({
               dwollaCustomerId: user.dwollaCustomerId,
               processorToken,
               bankName: accountData.name,
          });

          // if funding source url is not created, throw and error
          if(!fundingSourceUrl) throw Error;

          // Create a bank account using the user ID, item Id, account Id, access token, funding soruce url, and sharable ID

          await createBankAccount({
               userId: user.$id,
               bankId: itemId,
               accountId: accountData.account_id,
               accessToken,
               fundingSourceUrl,
               shareableId: encryptId(accountData.account_id),

          });

          // Revalidate the path to reflect  the changes
          revalidatePath('/');

          return parseStringify({
               publicTokenExchange: "Complete"
          })

          
     } catch (error) {
          console.log("An error occured while creating exchanig token: ",error);
          
     }

}

export const getBanks = async({userId}:getBanksProps) =>{
     try {
          const { database } = await createAdminClient();
      
          const banks = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
          )
      
          return parseStringify(banks.documents);
        } catch (error) {
          console.log(error)
        }
}
export const getBank = async({documentId}:getBankProps) =>{
     try {
          const {database} = await createAdminClient();

          const bank = await database.listDocuments(
               DATABASE_ID!,
               BANK_COLLECTION_ID!,
               [Query.equal('$id', [documentId])]
          )

          return parseStringify(bank.documents[0]);
          
     } catch (error) {
          console.log(error);
          
     }
}
export const getBankByAccountId = async({accountId}:getBankByAccountIdProps) =>{
     try {
          const {database} = await createAdminClient();

          const bank = await database.listDocuments(
               DATABASE_ID!,
               BANK_COLLECTION_ID!,
               [Query.equal('accountId', [accountId])]
          )
          if(bank.total !== 1) return null

          return parseStringify(bank.documents[0]);
          
     } catch (error) {
          console.log(error);
          
     }
}