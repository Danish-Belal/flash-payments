import React from 'react'
import {
     Sheet,
     SheetContent,
     SheetDescription,
     SheetHeader,
     SheetTitle,
     SheetTrigger,
   } from "@/components/ui/sheet"
import Image from 'next/image'
   
const MobileNavBar = ({user}: MobileNavProps) => {
  return (
    <section className='w-full max-w-[264px]'>
     <Sheet>
  <SheetTrigger>
     <Image src="/icons/hamburger.svg" width={30} height={30} alt='Menu' className='cursor-pointer'/>
  </SheetTrigger> 
  <SheetContent side={'left'} className='border-none bg-white'>
    
  </SheetContent>
</Sheet>

    </section>
  )
}

export default MobileNavBar
