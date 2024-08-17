import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

function Home() {
     const loggedIn = {firstName: 'Danish' , lastName: 'Belal', email: 'danishexplore019@gmail.com'}
  return (
    <section className='home'>
     <div className='home-content'>
          <header className='home-header'>
               <HeaderBox 
                    type="greeting"
                    title="Welcome"
                    user={loggedIn?.firstName || 'Guest'}
                    subtext="Access and manage you account and transaction efficiently."
               />
          </header>
          <TotalBalanceBox 
           accounts={[]}
           totalBanks={2}
           totalCurrentBalance={12340.65}
          />
          Recent Transacrions
     </div>
     <RightSidebar 
     user={loggedIn}
     transactions={[ ]}
     banks={[{currentBalance: 3323} , {currentBalance: 5473.09}]}
     />
    </section>
  )
}

export default Home