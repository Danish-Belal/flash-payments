import React from 'react'
import {
     Form,
     FormControl,
     FormDescription,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
   } from "@/components/ui/form"
   import { Input } from "@/components/ui/input"
import { Control, FieldPath } from 'react-hook-form'
import { AuthformSchema } from '@/lib/utils'
import { z } from 'zod'

const authSchema =  AuthformSchema('sign-in')
interface CustomInput {
     control:  Control<z.infer<typeof authSchema>>,
     name: FieldPath<z.infer<typeof authSchema>>,
     label: string,
     placeholder : string,
}
const CustomInput = ({ control, name, label, placeholder}: CustomInput) => {
  return (
     <FormField
     control={control}
     name ={ name}
     render={({ field }) => (
       <FormItem>
          <div className='form-item'>
               <FormLabel>{label}</FormLabel>
          </div>
         <div className='flex w-full flex-col'>
         <FormControl>
           <Input className='input-class' type={name} placeholder={placeholder} {...field} />
         </FormControl>
         </div>
         {/* <FormDescription>
          {label}.
         </FormDescription> */}
         <FormMessage  className='form-message  mt-2'/>
       </FormItem>
     )}
   />
  )
}

export default CustomInput
