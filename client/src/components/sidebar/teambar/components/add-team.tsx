"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SingleTeamTab from "./single-team-tab";
import { AddIcon } from "../../../ui/icons";
import { useResponsive } from "@/hooks/useResponsive";
import { useCreateTeamMutation } from "@/query-hooks/team";
import { ProfileForm } from "./add-team-form";

function AddTeamDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const {
    screenState: { md },
  } = useResponsive();

  if (md) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="w-full">
            <SingleTeamTab
              teamName="Add Team"
              isFunc={true}
              icon={<AddIcon />}
            />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <button className="w-full">
          <SingleTeamTab teamName="Add Team" isFunc={true} icon={<AddIcon />} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-darker">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" handleClose={handleClose} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export default AddTeamDialog;
