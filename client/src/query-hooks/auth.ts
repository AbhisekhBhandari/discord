import { toast } from "@/components/ui/use-toast";
import { graphql } from "@/gql";
import { LoginDocument, RegisterDocument } from "@/gql/types";
import { requestClient } from "@/lib/request";
import { TLoginSchema, TSignupSchema } from "@/lib/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegisterMutation = () => {
  const navigate = useRouter();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: TSignupSchema) => {
      return await requestClient.request(RegisterDocument, {
        input: {
          username: data.username,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
        },
      });
    },
    onSuccess: ({ register }) => {
      console.log("datas", register?.__typename);
      if (register?.__typename === "AuthError") {
        throw Error(register.message);
      }
      localStorage.setItem("user", JSON.stringify(register));

      toast({
        title: "Success",
      });
      navigate.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error Occured",
        description: error.message,
        variant: "destructive",
      });
      return error;
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: TLoginSchema) => {
      return await requestClient.request(LoginDocument, {
        loginInput: { email: data.email, password: data.password },
      });
    },
    onSuccess: ({ login }) => {
      console.log("lf", login);

      if (login?.__typename === "AuthError") throw new Error(login.message);
      localStorage.setItem("user", JSON.stringify(login));
      toast({
        title: "Logged in succesfully",
        variant: "default",
      });

      navigate.push("/");
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });
};
