"use client";
import { useSettingsContext } from "@/context/settings/context/settings-context";
import CAvatar from "@/components/ui/custom/Cavatar";
import {
  Headphone,
  HeadphoneSlashed,
  Mic,
  MicMuted,
  Setting,
} from "@/components/ui/icons";
import { CTooltip } from "@/components/ui/tooltip";
import { useAuthContext } from "@/context/auth";
import { User } from "@/gql/types";
import React from "react";
import SettingsModal from "@/components/settings";

function UserTab() {
  const { isDefened, isMicOpen, toggleDeafen, toggleMic } =
    useSettingsContext();
  const { user } = useAuthContext();

  const temps = {
    mic: {
      icon: isMicOpen ? (
        <MicMuted className="text-red-800  h-6 w-6" />
      ) : (
        <Mic className="   h-6 w-6" />
      ),
      message: isMicOpen ? "Turn on Microphone" : " Turn Off microphone",
    },
    speaker: {
      icon: isDefened ? (
        <Headphone className="  " />
      ) : (
        <HeadphoneSlashed className="text-red-800 " />
      ),
      messsage: isDefened ? "Undeafen " : "Deafen",
    },
  };

  return (
    <div className="flex justify-between bg-darker items-center   absolute bottom-0 left-0 right-0 py-2 px-1">
      <div className="flex gap-2 items-center py-1">
        <CAvatar className="h-11 w-11" />
        <div>
          <p className="text-lg font-medium text-white">{user?.username}</p>
          <p>Online</p>
        </div>
      </div>
      <div className="flex items-center  ">
        <CTooltip
          element={temps.mic.icon}
          message={temps.mic.message}
          hoverBG={true}
          onClick={toggleMic}
        />
        <CTooltip
          element={temps.speaker.icon}
          message={temps.speaker.messsage}
          hoverBG={true}
          onClick={toggleDeafen}
        />
        <SettingsModal />
      </div>
    </div>
  );
}

export default UserTab;
