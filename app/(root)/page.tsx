import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.action'
import React from 'react'

const Home = async () => {
     const loggedInUser = await getLoggedInUser();
  return (
    <section className="home">
     <div className="home-content">
          <header className="home-header">
               <HeaderBox 
                    type="greeting"
                    title="Welcome"
                    user={ loggedInUser?.name || 'Guest'}
                    subtext="Access and manage you account and transaction efficiently."
               />
          
          <TotalBalanceBox 
           accounts={[]}
           totalBanks={2}
           totalCurrentBalance={12340.65}
          />
          </header>

          Recent Transacrions
     </div>
     
     <RightSidebar 
     user={loggedInUser}
     transactions={[]}
     banks={[{currentBalance: 3323} , {currentBalance: 5473.09}]}
     />
    </section>
  )
}

export default Home