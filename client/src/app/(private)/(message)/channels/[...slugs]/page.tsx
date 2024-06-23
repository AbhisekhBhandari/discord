import React, { useState } from "react";
import Message from "@/components/Message";

const Page = ({ params: { slugs } }: { params: { slugs: string[] } }) => {
  return( 

  <Message selectedChannelId={slugs[1]} />
);
};

export default Page;
