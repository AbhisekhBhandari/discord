"use client";
import React, { useState } from "react";
import bg from "../../../assets/background/Authbg.webp";
import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";
import { TAuthState } from "@/components/auth/types/types";
import BubbleParticle from "@/components/auth/ui/particle/particle";

function AuthPage() {
  const [authState, setAuthState] = useState<TAuthState>("login");

  const toggleAuthState = (type: TAuthState) => {
    setAuthState(type);
  };

  return (
    <div
      className="h-full w-full bg-cover bg-center flex items-center justify-center "
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        height: "100%",
      }}
    >
      <BubbleParticle />
      <div className=" w-11/12 sm:w-8/12 z-20">
        {authState === "login" ? (
          <LoginForm toggleAuthState={toggleAuthState} />
        ) : (
          <SignupForm toggleAuthState={toggleAuthState} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;
