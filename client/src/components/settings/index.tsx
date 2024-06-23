import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CTooltip } from "../ui/tooltip";
import { Setting } from "../ui/icons";
import { SettingsSidebar } from "./components/settings-sidebar";
import { playlists } from "./components/mock";

function SettingsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CTooltip element={<Setting />} message="UserSettings" hoverBG={true} />
      </DialogTrigger>
      <DialogContent className="max-w-full flex  px-0 py-0 w-screen h-screen border-none rounded-none">
        <DialogTitle className="hidden">Settings</DialogTitle>
          <div className=" bg-muted w-4/12 flex justify-end">
            <SettingsSidebar playlists={playlists} className="w-[350px]" />
          </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;
