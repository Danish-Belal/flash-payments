"use server"
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const SignIn = async({email,password}: signInProps) =>{
     try{
          const { account } = await createAdminClient();
          // const signinUser = await account.createEmailPasswordSession(email,password);
          const signinUser = await account.createEmailPasswordSession(email,password);
          return parseStringify(signinUser);


     }catch(error){
          console.log(error);
          
     }
}
export const SignUp = async (userData : SignUpParams) =>{
     const {email, firstName, lastName , password} = userData;
     try{

          const { account } = await createAdminClient();

          const newUser = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
          const session = await account.createEmailPasswordSession(email, password);
        
          cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });

          return parseStringify(newUser);

     }catch (error) {
          console.error('Error', error);
     }

}


export async function getLoggedInUser() {
     try {
       const { account } = await createSessionClient();
       const user =  await account.get();
       return parseStringify(user)
     } catch (error) {
       return null;
     }
   }
export async function LoggedOut(){
     try{
          const {account} = await createSessionClient();
          cookies().delete('appwrite-session');
          account.deleteSession('current');

     }catch(error){
          console.log(error);
          
     }
}