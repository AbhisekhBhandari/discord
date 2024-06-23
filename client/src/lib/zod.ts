import { z } from "zod";

const dateOfBirthSchema = z.date().refine(
  (date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDifference = today.getMonth() - date.getMonth();
    const dayDifference = today.getDate() - date.getDate();
    if (monthDifference < 0 || (monthDifference == 0 && dayDifference < 0)) {
      age--;
    }
    return age > 18;
  },
  {
    message: "You must be 18 years old",
  }
);

export const signupSchema = z
  .object({
    username: z.string().min(3, "Username should be atleast 3 characters long"),
    email: z.string().email(),
    password: z.string().min(5, "Passwords must be atleast 5 characters long"),
    confirmPassword: z.string(),
    dateOfBirth: dateOfBirthSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Passwords must be atleast 5 characters long"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const messageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty "),
});

export type TMessage = z.infer<typeof messageSchema>;

export const createTeamSchema = z.object({
  teamName: z
    .string()
    .min(3, "Team name must be atleast 3 characters long")
    .max(10, "Team name cannot be more than 10 characters long"),
});

export type TCreateTeam = z.infer<typeof createTeamSchema>;

export const createChannelSchema = z.object({
  channelName: z
    .string()
    .min(3, "Channel name must be atleast 3 characters long")
    .max(10, "Channel name cannot be more than 10 characters long"),
});

export type TCreateChannelSchema = z.infer<typeof createChannelSchema>;


