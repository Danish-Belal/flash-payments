import Link from "next/link";
import Image from "next/image";



const AuthFormHeader = ({ type, user, isError, formMessage }: AuthFormHeaderProps) => (
  <header className="flex flex-col gap-5 md:gap-8">
    <Link href="/" className="flex mb-12 cursor-pointer items-center gap-1">
      <Image src="/icons/logo.svg" width={34} height={34} alt="Flash Logo" />
      <h1 className="sidebar-logo">FlashPay</h1>
    </Link>

    <div className="flex flex-col gap-1 md:gap-3">
      <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
        {user  && type === 'sign-up' ? ("Link Account" ): type === "sign-in" ? "Sign In" : "Sign Up"}
      </h1>
      <p 
        className={`text-[16px] font-semibold ${isError ? "text-red-600" : "text-gray-600"}`} 
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        {user && type === 'sign-up' 
          ? "Link Your Account to get Started" 
          : isError 
            ? formMessage 
            : "Please Enter your Details"}
      </p>
    </div>
  </header>
);

export default AuthFormHeader;
