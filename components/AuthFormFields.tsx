import { Control } from "react-hook-form";
import CustomInput from "./CustomInput";

interface AuthFormFieldsProps {
  type: string;
  control: Control<any>;
}

const AuthFormFields = ({ type, control }: AuthFormFieldsProps) => (
  <>
    {type === "sign-up" && (
      <>
        <div className="flex gap-4">
          <CustomInput 
                    control={control} 
                    name="firstName" label="First Name" placeholder="Enter your first name" />
          <CustomInput 
                    control={control} 
                    name="lastName" label="Last Name" placeholder="Enter your last name" />
        </div>

        <CustomInput 
               control={control} 
               name="address" 
               label="Address" 
               placeholder="Enter your specific address" />
        <CustomInput 
               control={control} 
               name="city" 
               label="City" 
               placeholder="Enter your city" />
        <div className="flex gap-4">
          <CustomInput 
                    control={control} 
                    name="state" 
                    label="State" 
                    placeholder="eg: WB" />
          <CustomInput 
                    control={control} 
                    name="pincode" 
                    label="Postal Code" 
                    placeholder="Postal Code" />
        </div>
        <div className="flex gap-4">
          <CustomInput 
                    control={control} 
                    name="dob" 
                    label="Date of Birth" 
                    placeholder="YYYY-MM-DD" />
          <CustomInput 
                    control={control} 
                    name="ssn" 
                    label="SSN / AADHAAR No" 
                    placeholder="Example: 1234" />
        </div>
      </>
    )}

    <CustomInput 
          control={control} 
          name="email" 
          label="Email" 
          placeholder="Please enter your email" />
    <CustomInput 
          control={control} 
          name="password" 
          label="Password" 
          placeholder="Please enter your password" />
  </>
);

export default AuthFormFields;
