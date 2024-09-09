import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AuthFormButtonProps {
  isLoading: boolean;
  type: string;
}

const AuthFormButton = ({ isLoading, type }: AuthFormButtonProps) => (
     <div className="flex flex-col gap-4">
  <Button type="submit" className="form-btn" disabled={isLoading}>
    {isLoading ? (
      <>
        <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
      </>
    ) : type === "sign-in" ? (
      "Sign In"
    )  : type === "user-details-bank" ? (
      "Add Details"
    ) : "Sign Up"}
  </Button>
  </div>
);

export default AuthFormButton;
