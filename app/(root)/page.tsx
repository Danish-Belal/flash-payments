import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

function Home() {
     const loggedIn = {firstName: 'Danish'}
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
     </div>
    </section>
  )
}

export default Home