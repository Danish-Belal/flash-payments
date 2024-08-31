import Link from "next/link";
import Image from "next/image";

interface AuthFormHeaderProps {
  type: string;
  user: any;
  isError: boolean;
  formMessage: string;
}

const AuthFormHeader = ({ type, user, isError, formMessage }: AuthFormHeaderProps) => (
  <header className="flex flex-col gap-5 md:gap-8">
    <Link href="/" className="flex mb-12 cursor-pointer items-center gap-1">
      <Image src="/icons/logo.svg" width={34} height={34} alt="Flash Logo" />
      <h1 className="sidebar-logo">FlashPay</h1>
    </Link>

    <div className="flex flex-col gap-1 md:gap-3">
      <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
        {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
      </h1>
      <p className={`text-16 font-normal ${isError ? "text-red-600" : "text-gray-600"}`}>
        {user ? "Link Your Account to get Started" : isError ? formMessage : "Please Enter your Details"}
      </p>
    </div>
  </header>
);

export default AuthFormHeader;
