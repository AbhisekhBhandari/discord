import React from "react";
import MessageBody from "./components/message-body";
import MessageHead from "./components/message-head";
import MessageInput from "./components/message-input";

async function Message({ selectedChannelId }: { selectedChannelId: string }) {
  return (
    <div className="flex  flex-col  pb-6 flex-grow h-full ">
      <MessageHead id={selectedChannelId} type="channel" />

      <MessageBody id={selectedChannelId} type="channel" />
      <MessageInput selectedChannelId={selectedChannelId} type="channel" />
    </div>
  );
}

export default Message;
