import React from "react";

import MessageBody from "@/components/Chat/message-body";
import MessageInput from "@/components/Chat/message-input";
import MessageHead from "@/components/Chat/message-head";

function PrivateMessage({ params: { slug } }: { params: { slug: string } }) {
  console.log("params", slug);

  return (
    <div className="flex flex-grow flex-col pb-5 h-full max-h-screen ">
      <MessageHead id={slug} type="direct" />
      <MessageBody id={slug} type="direct" />

      <MessageInput selectedChannelId={slug} type="direct"/> 
    </div>
  );
}

export default PrivateMessage;
