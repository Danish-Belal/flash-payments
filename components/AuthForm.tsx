'use client'
import { Divide, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { AuthformSchema } from '@/lib/utils'
import countries from "countries-list"; 

const AuthForm = ({type} : {type:string}) => {
  const [user, setUser] = useState(null);
  const[isLoading, setIsLoading] = useState(false)
  
  const formSchema = AuthformSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    

    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    console.log(values)
    setIsLoading(false);
  }
  return (
    <section>
      <header className='flex flex-col gap-5 md:gap-8'>
      <Link href="/" className='flex mb-12 cursor-pointer items-center gap-1'>
               <Image  src="/icons/logo.svg" width={34} height={34} alt="Flash Logo"/>
               <h1 className='sidebar-logo'>FlashPay</h1>
        </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account' : type === 'sign-in'? 'Sign In' : 'Sign Up'}
            <p className='text-16 font-normal  text-gray-600'>
              {user ? 'Link Your Account to get Started' : 'Please Enter your Details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>
          {/* PlaidLink */}
        </div>
      ): 
      (
        <>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Sign Up */}
        { type === 'sign-up'  && ( 
          <>
          <div className='flex gap-4'>
            <CustomInput control={form.control} name={"firstName"} label={"First Name"} placeholder={"Enter your first name"} />
            <CustomInput control={form.control} name={"lastName"} label={"Last Name"} placeholder={"Enter your last name"} />
          </div>

          <CustomInput control={form.control} name={"address"} label={"Address"} placeholder={"Enter your specific address"} />
          <CustomInput control={form.control} name={"city"} label={"City"} placeholder={"Enter your city"} />
          <div className='flex gap-4'>
            <CustomInput control={form.control} name={"state"} label={"State"} placeholder={"State"} />
            <CustomInput control={form.control} name={"pincode"} label={"Postal Code"} placeholder={"Postal Code"} />
          </div>
          <div className='flex gap-4'>
            <CustomInput control={form.control} name={"dob"} label={"Date of Birth"} placeholder={"YYYY-MM-DD"} />
            <CustomInput control={form.control} name={"ssn"} label={"SSN"} placeholder={"Example: 1234"} />
          </div>
          </>
         )}

        {/* Sign In */}
        <CustomInput control = {form.control} name={"email"} label='Email' placeholder={"Please enter you email"} />
        <CustomInput control = {form.control} name={"password"} label='Password' placeholder={"Please enter you password"} />
        
        <div className='flex flex-col gap-4'>
          <Button type="submit" className='form-btn' disabled={isLoading}>
            {isLoading ? (
              <>
              <Loader2 size={20} className='animated-spin' /> &nbsp; Loading...
              </>
            ): type === 'sign-in'  ? 'Sign In' : 'Sign Up'
            }
          </Button>
        </div>
        
      </form>
    </Form>
        <footer className='flex justify-center gap-1'>
          <p className='text-14  font-normal text-gray-600'>
            {type === 'sign-in' ? "Don't have an account?" : 'Already have an account'}
          </p>
          <Link  href={type === 'sign-in'? '/sign-up': '/sign-in'} className='form-link top'>{type === 'sign-in'? 'Sign Up': 'Sign In'}</Link>

        </footer>
        </>
      )
       }
    </section>
  )
}

export default AuthForm
