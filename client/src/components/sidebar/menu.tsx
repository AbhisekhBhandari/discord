"use client";
import { useSidebarContext } from "@/context/sidebarContext";
import React from "react";
import { Button } from "../ui/button";
import { CrossIcon, LeaveIcon, MenuIcon } from "../ui/icons";

export function ShowSidebarMenu() {
  const { showSidebar, toggleSidebar } = useSidebarContext();
  return (
    <Button
      onClick={() => toggleSidebar()}
      className="xl:hidden"
      variant={"ghost"}
    >
      <MenuIcon />
    </Button>
  );
}

export function HideSidebarMenu() {
  const { showSidebar, toggleSidebar } = useSidebarContext();
  return (
    <Button
      onClick={() => {
        console.log("clise");

        toggleSidebar();
      }}
      // className="xl:hidden"
    >
      Close
    </Button>
    // <LeaveIcon
    // onClick={() => {
    //   console.log("clise");

    //   toggleSidebar();
    // }}
    //   className=""
    // />
  );
}
