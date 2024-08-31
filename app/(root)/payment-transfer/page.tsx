import HeaderBox from '@/components/HeaderBox'
import PageEmpty from '@/components/PageEmpty';
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.action';
import React from 'react'

const PaymentTransfer = async() => {
  const loggedInUser = await getLoggedInUser();

     const accounts = await getAccounts({userId: loggedInUser.$id});
     
     if (!accounts || accounts.data.length === 0) {
      return <PageEmpty message='Not Able to transfer Fund.' />;
    }

     const accountData = accounts?.data;

  return (
    <section className='payment-transfer'>
      <HeaderBox 
      title='Payment Transfer'
      subtext='Please provide any specific details or notes related to payment transfer'
      />
      <section className='size-full pt-5'>
        <PaymentTransferForm  accounts={accountData}/>
      </section>
    </section>
  )
}

export default PaymentTransfer
