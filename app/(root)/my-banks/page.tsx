import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.action';
import React from 'react'

const MyBanks = async() => {
  const loggedInUser = await getLoggedInUser();

     const accounts = await getAccounts({userId: loggedInUser.$id});
  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox 
          title='My Banks Accounts'
          subtext='Effortlessly manage your bankig activity'
        />
        <div className='space-y-4'>
          <h2 className='header-2'>Your cards</h2>
          <div className='flex flex-wrap gap-6'>
            {accounts && accounts.data.map((a: Account)=>(
              <BankCard 
              key={accounts.id}
              account={a}
              userName={loggedInUser?.firstName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks