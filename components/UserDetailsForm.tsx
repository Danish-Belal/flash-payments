'use client'

import React, { useState } from 'react';
import { Form } from './ui/form';
import { useForm } from "react-hook-form";
import AuthFormButton from './AuthFormButton';
import AuthFormFields from './AuthFormFields';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthformSchema, formatDateforDOB } from '@/lib/utils';
import { addBank } from '@/lib/actions/bank.actions';
import { useRouter } from 'next/navigation';

const UserDetailsForm = ({ user, type }: UserDetailsForBank) => {
  console.log("INside UserDetails fomr",user,type);
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = AuthformSchema(type);

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
  });
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Inside SUbmit");
    
    setIsLoading(true); // Start loading state

    let dateOfBirth = formatDateforDOB(data.dob!);
    const userData = {
      address1: data.address!,
      city: data.city!,
      state: data.state!,
      ssn: data.ssn!,
      postalCode: data.pincode!,
      dateOfBirth: dateOfBirth!,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      type: "personal",
    };

    try {
      const userDataBank = await addBank(userData);
      if (userDataBank) {
        setIsLoading(false);
        router.push('/');
      }
    } catch (error) {
      console.error("Error adding bank:", error);
      setIsLoading(false); // End loading state on failure
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AuthFormFields type={type} control={form.control} />
          <AuthFormButton isLoading={isLoading} type={type} />
        </form>
      </Form>
    </>
  );
};

export default UserDetailsForm;
