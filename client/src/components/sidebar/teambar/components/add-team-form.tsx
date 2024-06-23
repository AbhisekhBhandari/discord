import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCreateTeamMutation } from "@/query-hooks/team";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCreateTeam, createTeamSchema } from "@/lib/zod";

interface IProfileFormProps extends React.ComponentProps<"form"> {
  handleClose: () => void;
}

export function ProfileForm({ handleClose, className }: IProfileFormProps) {
  const form = useForm<TCreateTeam>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      teamName: "",
    },
  });
  const { mutate } = useCreateTeamMutation();
  async function onSubmit({ teamName }: TCreateTeam) {
    mutate({ teamName });
    handleClose();
  }
  // const onTeamCreate = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const teamName = formData.get("teamName");
  // };

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input id="teamName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Create Team</Button>
      </form>
    </Form>
  );
}
