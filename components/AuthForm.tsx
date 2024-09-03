"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { AuthformSchema, formatDateforDOB } from "@/lib/utils";
import PlaidLink from "./PlaidLink";
import { signIn, signUp } from "@/lib/actions/user.action";
import AuthFormHeader from "./AuthFormHeader";
import AuthFormFields from "./AuthFormFields";
import AuthFormButton from "./AuthFormButton";
import AuthFormFooter from "./AuthFormFooter";
import { Button } from "./ui/button";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formMessage, setformMessage] = useState('');

  const formSchema = AuthformSchema(type);

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setIsError(false); // Reset error state before the request
    setformMessage('');

    try {
      if (type === "sign-up") {
        let dataOfBirth = formatDateforDOB(data.dob!);
        
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address!,
          city: data.city!,
          state: data.state!,
          ssn: data.ssn!,
          postalCode: data.pincode!,
          dateOfBirth: dataOfBirth!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);
        
        if (newUser.error) {         
          setIsError(true);
          setformMessage(newUser.message); // Set error message
          return;
        }
  
        setUser(newUser); // Set user if no error
      } else if (type === "sign-in") {
        const loggedInUser = await signIn({
          email: data.email,
          password: data.password,
        });

        if (loggedInUser.error) {
          setIsError(true);
          setformMessage(loggedInUser.message); // Set error message
          return;
        }

        setUser(loggedInUser); // Set the user if login is successful
        router.push("/"); // Redirect immediately after successful login
        return; // Exit the function
      }
    } catch (error) {
      console.error("Error", error);
      setIsError(true);
      setformMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      
        {/* Conditionally render AuthFormHeader */}
    {(type === "sign-up" || (type === "sign-in"  ) ) && ( //work here
      <AuthFormHeader type={type} user={user} isError={isError} formMessage={formMessage} />
    )}

      {user && type === "sign-up" ? ( // Show options only for sign-up
        <>
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
        <Button 
          variant="secondary" 
          onClick={() => router.push('/')}
          className="mt-4"
        >
          <p className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out">Go to Dashboard</p>
        </Button>
        </>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AuthFormFields type={type} control={form.control} />
              <AuthFormButton isLoading={isLoading} type={type} />
            </form>
          </Form>
          <AuthFormFooter type={type} />
        </>
      )}
    </section>
  );
};

export default AuthForm;
