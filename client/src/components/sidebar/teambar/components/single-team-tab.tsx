"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import Link from "next/link";
import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";

interface SingleTeamTabInterface extends React.HTMLAttributes<HTMLDivElement> {
  linkId?: string;
  teamImage?: string | null;
  teamName: string;
  icon?: JSX.Element;
  isFunc: boolean;
}
interface SingleTeamTabStructInterface extends SingleTeamTabInterface {
  isActive?: boolean;
}

// "https://github.com/shadcn.png"
export default function SingleTeamTab({
  linkId,
  teamImage,
  teamName,
  icon,
  isFunc = false,
  onClick,
}: SingleTeamTabInterface) {
  const isActive = useSelectedLayoutSegment() == linkId;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {linkId ? (
            <Link
              href={`${linkId}`}
              className="w-full flex relative  items-center justify-center"
            >
              <SingleTeamTabStruct
                teamImage={teamImage}
                icon={icon}
                teamName={teamName}
                isFunc={isFunc}
                isActive={isActive}
                onClick={onClick}
              />
            </Link>
          ) : (
            <div className="w-full flex relative  items-center justify-center">
              <SingleTeamTabStruct
                teamImage={teamImage}
                icon={icon}
                teamName={teamName}
                isFunc={isFunc}
                isActive={isActive}
                onClick={onClick}
              />
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent
          side="right"
          arrowPadding={10}
          className="mx-1 border-none"
        >
          <div className="py-1 ">
            <p className="text-lg text-white ">{teamName}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
function SingleTeamTabStruct({
  teamImage,
  icon,
  teamName,
  isFunc,
  isActive,
  onClick,
}: SingleTeamTabStructInterface) {
  return (
    <>
      <Avatar
        className={`w-16  peer  h-16  ${
          isActive ? "rounded-2xl" : "hover:rounded-2xl"
        }    cursor-pointer `}
        onClick={onClick}
      >
        <AvatarImage src={teamImage ? teamImage : undefined} />
        <AvatarFallback
          className={cn(
            `bg-[#303339] hover:rounded-2xl  transition-all w-full h-full  text-3xl hover:bg-[#686bff] hover:text-white text-darkerForeground`,
            "",
            {
              "hover:bg-[#23A559] text-[#23A559] hover:text-white text-3xl":
                isFunc,
              "rounded-2xl bg-[#686bff] text-white": isActive && !isFunc,
              "bg-[#23A559] text-white": isActive && isFunc,
            }
          )}
        >
          {icon ? <div className="w-8">{icon}</div> : teamName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={`w-3 h-3 absolute ${
          isActive && !isFunc ? "h-3/5" : "peer-hover:h-2/5 "
        }  transition-all  bg-white rounded-full -left-[0.37rem]`}
      ></div>
    </>
  );
}
