import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TCreateChannelSchema, createChannelSchema } from "@/lib/zod";
import { useCreateChannel } from "@/query-hooks/channel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface IAddChannelForm extends React.ComponentProps<"form"> {
  teamId: string;
  handleClose: () => void;
}

export function AddChannelForm({
  teamId,
  handleClose,
  className,
}: IAddChannelForm) {
  const form = useForm<TCreateChannelSchema>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      channelName: "",
    },
  });
  const { mutate } = useCreateChannel(teamId, handleClose);
  async function onSubmit({ channelName }: TCreateChannelSchema) {
    mutate({ channelName });
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="channelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitted}>
          {form.formState.isSubmitting ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
