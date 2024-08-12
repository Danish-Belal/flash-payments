import { formatAmount } from '@/lib/utils'
import React from 'react'
import { DoughnutChart } from './DoughnutChart'

import { AnimatedCounter } from './AnimatedCounter'
const TotalBalanceBox = ({
     accounts=[], totalBanks, totalCurrentBalance
}: TotlaBalanceBoxProps )=> {
  return (
    <div>
     <section className="total-balance">
          <div className="total-balance-chart">
               {/* Donoughts */}
               <DoughnutChart accounts={accounts} />
          </div>
          <div className='flex flex-col gap-6'>
               <h2 className='header-2'>
                    Bank Accounts: {totalBanks}
               </h2>
          <div className='flex flex-col gap-2'>
               <p className='total-balance-label'>
                    Your current Balance
               </p>
               <div className='total-balance-amount flex-center gap-2'>
                    <AnimatedCounter amount={totalCurrentBalance} />
               </div>
          </div>
          </div>
     </section>
      
    </div>
  )
}

export default TotalBalanceBox
