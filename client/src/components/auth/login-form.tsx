import React from "react";
import { Input } from "@/components/ui/input";
import { PrivateInput } from "@/components/ui/private-input";
import { Button } from "@/components/ui/button";
import QRImage from "@/assets/images/QR-image.png";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TAuthComponentProps } from "./types/types";
import { useForm } from "react-hook-form";
import { TLoginSchema, loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useLoginMutation } from "@/query-hooks/auth";

function LoginForm({ toggleAuthState }: TAuthComponentProps) {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isError } = useLoginMutation();

  return (
    <Card className="   bg-background border-none px-3 py-5">
      <CardContent className="flex mx-1  h-full gap-5  ">
        <div className="w-full md:w-1/2 flex flex-col gap-1 ">
          <CardHeader className="w-full  flex gap-1 items-center">
            <CardTitle className="text-white tracking-wide">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-muted-foreground  text-base font-medium">
              We're so excited to see you again!
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                mutate(data);
              })}
              className="flex flex-col gap-1"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-xs tracking-wide">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className=" border-none ring-offset-hoverBlue  bg-muted  text-muted-foreground font-semibold rounded-sm focus-visible:ring-0 "
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-xs tracking-wide">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PrivateInput
                        className=" border-none bg-muted text-muted-foreground  rounded-sm ring-0 focus-visible:ring-0  ring-offset-hoverBlue"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-hoverBlue text-sm my-3 cursor-pointer hover:underline ">
                Forgot your password?
              </p>
              <Button
                className="bg-hoverBlue hover:bg-hoverBlue mt-2 disabled:bg-slate-500"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Loading" : "Login"}
              </Button>
              <p
                className="text-hoverBlue text-sm my-3 cursor-pointer hover:underline"
                onClick={() => toggleAuthState("signup")}
              >
                Don't have an account? Sign up here
              </p>
            </form>
          </Form>
        </div>
        <div className="w-1/2 h-full  hidden md:flex flex-col items-center gap-3 my-14 ">
          <Image src={QRImage} alt="QR Code" />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Log in with QR Code
          </h1>
          <p className=" text-center px-12 text-sm  text-foreground tracking-wide ">
            Scan this with the{" "}
            <span className="font-semibold ">scanner app</span> to log in
            instantly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
