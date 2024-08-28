'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import {Category} from './Category'
import PlaidLink from './PlaidLink'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.action'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { Button } from './ui/button'

const RightSidebar = ({user, banks, transactions}: RightSidebarProps) => {
     const categories:  CategoryCount[] = countTransactionCategories(transactions);

     const [token, setToken] = useState('')

  useEffect(()=>{
    const getLinkToken = async ()=>{
      // console.log('Goin to create link for plaid');
      
      const data = await createLinkToken(user);
      // console.log("Data in plaid component",data.linkToken);
      setToken(data?.linkToken)
    }

    getLinkToken();
  },[user]);

  const onSuccess  = useCallback<PlaidLinkOnSuccess>(async(public_token: string )=>{
    
    // console.log('Public token', public_token);
    
    
    const exchangeToken = await exchangePublicToken({
      publicToken: public_token,
      user,
    })
    // console.log('exchange Public Token in plaid', exchangeToken.publicTokenExchange);

    
  },[user])
  
  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const {open , ready} = usePlaidLink(config);

  return (
    <aside className='right-sidebar'>
     <section className='flex flex-col pb-b'>
          <div className='profile-banner'></div>
          <div className='profile'>
               <div className='profile-img'>
                    <span className='text-5xl font-bold text-blue-500'>{user?.firstName[0]}</span>
               </div>
               <div className='profile-details'>
                    <h1 className='profile-name'>{user?.firstName}{user?.lastName}</h1>
                    <p className='profile-email'>{user?.email}</p>
                    
               </div>
          </div>
     </section>
     <section className='banks'>
          <div className='flex w-full justify-between'>
               <h2 className='header-2'>Your Banks</h2>
               
               <Button onClick={()=> open()} disabled={!ready}>
               <Image src="/icons/plus.svg" width={20} height={20} alt='plus'
               />
                    <h2 className='text-14 font-semibold text-gray-600'>Add Banks</h2>
               </Button>
          </div>
          {banks?.length > 0 && (
               <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                    <div className='relativr z-10'> 
                          <BankCard 
                           key = {banks[0].$id}
                           account={banks[0]}
                           userName= {`${user.firstName} ${user.lastName}`}
                           showBalance={false}
                          />
                          </div>
                    {banks[1] && (
                    <div className='absolute right-0 top-8 z-0 w-[90%]'>
                    <BankCard
                         key = {banks[1].$id}
                         account={banks[1]}
                         userName= {user? `${user.firstName} ${user.lastName}`: ''}
                         showBalance={false}
                      />
                    </div>
               )}
               </div> 
               
          )}
          <div className='mt-10 flex flex-col flex-1 gap-6'>
               <h2 className='header-2'>Top Categories</h2>
               <div className='space-y-5'>
                    {categories.map((category , index)=>(
                         <Category key={category.name} category={category} />
                    ))}
               </div>

          </div>
          
     </section>
    </aside>
  )
}

export default RightSidebar
