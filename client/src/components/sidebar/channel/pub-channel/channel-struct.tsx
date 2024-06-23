import { InvitePeopleIcon, Setting } from "@/components/ui/icons";
import { CTooltip } from "@/components/ui/tooltip";
import { useSidebarContext } from "@/context/sidebarContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const ChannelStruct = ({
  teamId,
  channelId,
  channelName,
  selectedChannelId,
  isMobile,
}: {
  channelId: string;
  channelName: string;
  teamId: string;
  selectedChannelId: string;
  isMobile: boolean;
}) => {
  const { showSidebar, toggleSidebar } = useSidebarContext();
  
  return (
    <Link
      href={`/channels/${teamId}/${channelId}`}
      onClick={() => {
        if (isMobile) {
          console.log("ok");

          toggleSidebar();
        }
      }}
      className={cn(
        "flex items-center justify-between px-2 py-1 hover:bg-foreground/10 mx-3 rounded-lg cursor-pointer",
        "",
        {
          "bg-foreground/15": channelId === selectedChannelId,
        }
      )}
    >
      <div className="flex gap-2 h-full  items-center">
        <span className="text-lg"># </span>
        <p className="text-white ">{channelName}</p>
      </div>
      <div className="flex gap-2 ">
        <CTooltip
          element={<InvitePeopleIcon className="h-5 w-5" />}
          message="Invite"
          side="top"
        />
        <CTooltip
          element={<Setting className="h-5 w-5" />}
          message="Edit Channel"
          side="top"
        />
      </div>
    </Link>
  );
};
