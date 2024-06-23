"use client";
import React, { forwardRef, useState } from "react";
import { AttachIcon, GIFIcon, GiftIcon, SmileIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  useCreateDirectMessage,
  useCreateMessage,
} from "@/query-hooks/message";

interface IMessageInputProps {
  selectedChannelId: string;
  type: "channel" | "direct";
}

const MessageInput = forwardRef<HTMLInputElement, IMessageInputProps>(
  function MessageInput({ selectedChannelId, type }, ref) {
    const [message, setMessage] = useState("");
    const { mutate } =
      type === "channel"
        ? useCreateMessage(selectedChannelId)
        : useCreateDirectMessage(selectedChannelId);

    return (
      <form
        className="flex shrink-0 bg-foreground/10 h-14 gap-2 mx-4 px-2 rounded-lg items-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (message == "") return;
          mutate(message);
          setMessage("");
        }}
      >
        <AttachIcon className="hover:text-white cursor-pointer w-12 h-8" />
        <Input
          placeholder="Messagge @Username"
          className=" h-full bg-transparent text-lg focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-foreground/70"
          ref={ref}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <GiftIcon className="hover:text-white cursor-pointer w-12 h-10" />
        <GIFIcon className="hover:text-white cursor-pointer w-12 h-9" />
        <SmileIcon className="hover:text-white cursor-pointer w-12 h-9" />
      </form>
    );
  }
);

export default MessageInput;
