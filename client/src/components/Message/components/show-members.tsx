"use client";
import CAvatar from "@/components/ui/custom/Cavatar";
import { ShowProfileIcons } from "@/components/ui/icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CTooltip } from "@/components/ui/tooltip";
import { usePathName } from "@/hooks/newH/usePathname";
import { useGetTeamUsers } from "@/query-hooks/user";

export function ShowMembers() {
  const teamId = usePathName()[2];
  const { data, isLoading } = useGetTeamUsers(teamId);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        <CTooltip
          element={<ShowProfileIcons />}
          message="Show User Profile"
          hoverBG
        />
      </SheetTrigger>
      <SheetContent className="border-none px-2">
        <SheetHeader className="pb-3 px-3">
          <SheetTitle className="text-2xl text-white">Members</SheetTitle>
        </SheetHeader>
        <div className="">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-foreground/15 px-2 py-2 rounded-md">
            <CAvatar fallbackClassName="bg-red-700" />
            <p className="text-lg font-semibold">Username</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
