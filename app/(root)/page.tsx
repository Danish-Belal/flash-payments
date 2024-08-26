import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.action'
import React from 'react'

const Home = async ({searchParams : {id,page}}:SearchParamProps ) => {
     const currentPage = Number(page as string) || 1;
     const loggedInUser = await getLoggedInUser();

     const accounts = await getAccounts({userId: loggedInUser.$id});
     
     if(!accounts) return;

     const accountData = accounts?.data;
     const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;
     // console.log(appwriteItemId);
     
     const account = await getAccount({appwriteItemId});
     console.log("ACCOUNT" , account);
     

     // console.log(
     //      accountData,
     //      acconts
     // );
     
  return (
    <section className="home">
     <div className="home-content">
          <header className="home-header">
               <HeaderBox 
                    type="greeting"
                    title="Welcome"
                    user={ loggedInUser?.firstName || 'Guest'}
                    subtext="Access and manage you account and transaction efficiently."
               />
          
          <TotalBalanceBox 
           accounts={accountData }
           totalBanks={accounts?.totalBanks}
           totalCurrentBalance={accounts?.totalCurrentBalance}
          />
          </header>

          {/* Recent Transacrions */}
          <RecentTransactions 
               accounts= {accountData}
               transactions = {accounts?.transactions}
               appwriteItemId = {appwriteItemId}
               page={currentPage}
          />
     </div>
     
     <RightSidebar 
     user={loggedInUser}
     transactions={accounts?.transactions}
     banks={accountData?.slice(0,2)}
     />
    </section>
  )
}

export default Home