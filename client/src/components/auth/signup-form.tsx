import React from "react";
import { Input } from "@/components/ui/input";
import { PrivateInput } from "@/components/ui/private-input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TAuthComponentProps } from "./types/types";
// import { DatePicker } from "../ui/date";
import { useForm } from "react-hook-form";
import { TSignupSchema, signupSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormFieldDOB } from "./ui/form-date";
import { useRegisterMutation } from "@/query-hooks/auth";

function SignupForm({ toggleAuthState }: TAuthComponentProps) {
  const form = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      dateOfBirth: undefined,
    },
  });
  const { mutate, isPending, error } = useRegisterMutation();
  console.log("error", error);

  return (
    <Card className=" bg-background border-none px-3 py-5">
      <CardHeader className="w-full h-full flex flex-col items-center">
        <CardTitle className="text-white tracking-wide mb-1">
          Create a New Account
        </CardTitle>
        <CardDescription className="text-muted-foreground  text-base font-medium">
          Fill in the fields below to create a account
        </CardDescription>
      </CardHeader>
      <CardContent className="  h-full w-full mx-1   ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className=" flex flex-col gap-3  h-full w-full    "
          >
            <div className="grid  md:grid-cols-2 mb-3  gap-x-5 gap-y-3  ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-xs tracking-wide">
                      EMAIL
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-xs tracking-wide">
                      USERNAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="username"
                        placeholder="Username"
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
                      PASSWORD
                    </FormLabel>
                    <FormControl>
                      <PrivateInput
                        className=" border-none bg-muted text-muted-foreground  rounded-sm ring-0 focus-visible:ring-0  ring-offset-hoverBlue"
                        placeholder="Password"
                        type="password"
                        error={form.formState.errors.password}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-xs tracking-wide">
                      CONFIRM PASSWORD
                    </FormLabel>
                    <FormControl>
                      <PrivateInput
                        className=" border-none bg-muted text-muted-foreground  rounded-sm ring-0 focus-visible:ring-0  ring-offset-hoverBlue"
                        placeholder="Confirm Password"
                        type="password"
                        error={form.formState.errors.confirmPassword}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/*  -------------------------------*/}
            <FormFieldDOB form={form} />

            {/* -------- */}

            <Button className="bg-hoverBlue w-full hover:bg-hoverBlue mt-2">
              Sign up
            </Button>
            <p
              className="text-hoverBlue text-sm my-3 cursor-pointer hover:underline"
              onClick={() => toggleAuthState("login")}
            >
              Already have an account? Log in here
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
