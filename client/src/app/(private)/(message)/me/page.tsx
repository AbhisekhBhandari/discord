"use client";

import {
  FriendsIcon,
  HelpIcon,
  InboxIcon,
  MenuIcon,
  NewGroupIcon,
} from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CTooltip } from "@/components/ui/tooltip";
import Online from "@/components/Me/components/online";
import { SearchInput } from "@/components/ui/input";
import AddFriend from "@/components/Me/components/add-friend";
import { ShowSidebarMenu } from "@/components/sidebar/menu";
import All from "@/components/Me/components/all";
import Pending from "@/components/Me/components/pending";

function MePage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex flex-col justify-between flex-grow  h-screen max-h-screen">
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value)}
        className="w-full h-full flex flex-col"
      >
        <TabsList className="flex h-[90px] justify-between bg-transparent text-foreground text-lg px-4 shadow-lg mx-0">
          <div className="flex gap-4 h-full items-center">
            <div className="flex items-center gap-2">
              <ShowSidebarMenu />
              <FriendsIcon />
              <p>Friends</p>
            </div>
            <Separator
              orientation="vertical"
              className="h-3/5 bg-secondary-foreground"
            />
            <TabsTrigger value="team" className="text-lg">
              Team
            </TabsTrigger>
            <TabsTrigger value="all" className="text-lg">
              All
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex gap-2">
              <div className="flex items-center gap-1 text-lg">
                <p>Pending</p>
                <Badge>20</Badge>
              </div>
            </TabsTrigger>
            <TabsTrigger value="blocked" className="text-lg">
              Blocked
            </TabsTrigger>
            <TabsTrigger
              value="addFriend"
              className="text-lg bg-[#248046] text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#248046]"
            >
              Add Friend
            </TabsTrigger>
          </div>
          <div className="flex h-full items-center gap-4">
            <CTooltip element={<NewGroupIcon />} message="New Group DM" />
            <Separator
              orientation="vertical"
              className="h-3/5 bg-secondary-foreground"
            />
            <CTooltip element={<InboxIcon />} message="Inbox" />
            <CTooltip element={<HelpIcon />} message="Help" />
          </div>
        </TabsList>
        <div>
          <SearchInput placeholder="Search" className="mt-3 h-12 mx-3" />
        </div>
        <TabsContent
          value="team"
          className={`  ${
            filter === "online" ? "flex" : ""
          } flex-col flex-grow py-2 px-3 overflow-auto`}
        >
          <Online />
        </TabsContent>
        <TabsContent
          value="all"
          className={`  ${filter === "all" ? "flex" : ""} 
          flex-col flex-grow py-2 px-3 overflow-auto`}
        >
          <All />
        </TabsContent>
        <TabsContent
          value="pending"
          className={`  ${
            filter === "pending" ? "flex" : ""
          } flex-col flex-grow py-2 px-3 overflow-auto`}
        >
          <Pending />
        </TabsContent>
        <TabsContent
          value="addFriend"
          className="flex flex-col flex-grow py-2 px-3 overflow-auto"
        >
          <AddFriend />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MePage;
