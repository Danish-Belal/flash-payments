import Link from "next/link";

interface AuthFormFooterProps {
  type: string;
}

const AuthFormFooter = ({ type }: AuthFormFooterProps) => (
  <footer className="flex justify-center gap-1">
    <p className="text-14 font-normal text-gray-600">
      {type === "sign-in" ? "Don't have an account?" : "Already have an account"}
    </p>
    <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link top">
      {type === "sign-in" ? "Sign Up" : "Sign In"}
    </Link>
  </footer>
);

export default AuthFormFooter;
