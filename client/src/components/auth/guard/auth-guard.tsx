import { useAuthContext } from "@/context/auth";
import Image from "next/image";
import React, { useEffect } from "react";
import SpinnerGIF from "@/assets/spinner.gif";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function Authgurad({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const navigate = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      navigate.push("/login");
      toast({
        title: "Authentication failed. Redirected to login page",
        variant: "destructive",
      });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div>
        <Image src={SpinnerGIF} alt="Spinner" />
      </div>
    );
  }

  if (!user) {
    return null; // Optionally, you can return a different component or null while redirecting.
  }
  return <>{children}</>;
}

export default Authgurad;
