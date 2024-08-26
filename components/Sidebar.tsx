"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import path from 'path'
import React from 'react'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const Sidebar = ({user}: SiderbarProps) => {
     const pathname = usePathname();
  return (
    <section className='min-w-max sidebar'>
     <nav className='flex flex-col gap-6'>
          <Link href="/" className='flex mb-12 cursor-pointer items-center gap-2'>
               <Image  src="/icons/logo.svg" width={34} height={34} alt="Flash Logo"/>
               <h1 className='sidebar-logo'>FlashPay</h1>
          </Link>
          {
               sidebarLinks.map((item)=>{
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    return  (
                    <Link href={item.route} key={item.label}
                    className={cn('sidebar-link', {
                         'bg-bank-gradient' : isActive
                    })}
                    >
                         <div className='relative size-6'>
                              <Image src={item.imgURL} alt={item.label} fill 
                                   className={cn({
                                        'brigtness-[3] invert-0': isActive 
                                   })}
                              />
                         </div>
                         <p className={cn('sidebar-label' , {'!text-white' : isActive })}>
                              {item.label}
                         </p>
                    </Link>
               )
               })
          }
          <PlaidLink user={user}/>
          
     </nav>
          <Footer user={user} type='desktop' />
    </section>
  )
}

export default Sidebar
