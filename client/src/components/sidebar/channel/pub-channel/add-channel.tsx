"use client";
import * as React from "react";
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
import { AddIcon } from "@/components/ui/icons";
import { useResponsive } from "@/hooks/useResponsive";
import { CTooltip } from "@/components/ui/tooltip";
import {
  TCreateChannelSchema,
  TCreateTeam,
  createChannelSchema,
  createTeamSchema,
} from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddChannelForm } from "./add-channel-form";
import { TeamResponse } from "@/gql/types";

function AddChannelDialog({ team }: { team: TeamResponse }) {
  const [open, setOpen] = React.useState(false);
  const {
    screenState: { md },
  } = useResponsive();
  const handleClose = () => setOpen(false);

  if (md) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <CTooltip
            element={<AddIcon className="w-5 h-5" />}
            message="Create Channel"
            side="top"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <AddChannelForm teamId={team.teamId} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <CTooltip
          element={<AddIcon className="w-5 h-5" />}
          message="Create Channel"
          side="top"
        />
      </DrawerTrigger>
      <DrawerContent className="bg-darker">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <AddChannelForm
          className="px-4"
          teamId={team.teamId}
          handleClose={handleClose}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddChannelDialog;
