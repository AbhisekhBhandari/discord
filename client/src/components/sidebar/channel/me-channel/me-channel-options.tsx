import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  FriendsIcon,
  MessageRequestIcon,
  NitroIcon,
  ShopIcon,
} from "@/components/ui/icons";
export interface MeOptionsInterface {
  icon: JSX.Element;
  optionName: string;
  badgeContent?: string;
}
export const options: MeOptionsInterface[] = [
  {
    icon: <FriendsIcon />,
    optionName: "Friends",
    badgeContent: "20",
  },
  {
    icon: <NitroIcon />,
    optionName: "Nitro",
    badgeContent: undefined,
  },
  {
    icon: <MessageRequestIcon />,
    optionName: "Message Requests",
    badgeContent: "20",
  },
  {
    icon: <ShopIcon />,
    optionName: "Shop",
    badgeContent: undefined,
  },
];
function MeChannelOptions() {
  return (
    <div className="flex flex-col gap-1 px-2 py-2 ">
      {options.map((data: MeOptionsInterface) => (
        <MeOptions
          key={data.optionName}
          icon={data.icon}
          optionName={data.optionName}
          badgeContent={data.badgeContent}
        />
      ))}
    </div>
  );
}

export default MeChannelOptions;

function MeOptions({ icon, optionName, badgeContent }: MeOptionsInterface) {
  return (
    <div className="flex py-3 px-3 items-center  text-lg font-medium  rounded-md cursor-pointer hover:bg-foreground/10">
      {icon}
      <p className="flex-1 max-w-full px-4 text-ellipsis overflow-hidden whitespace-nowrap">
        {optionName}
      </p>
      {badgeContent && (
        <Badge variant={"destructive"} className="h-fit">
          {badgeContent}
        </Badge>
      )}
    </div>
  );
}
