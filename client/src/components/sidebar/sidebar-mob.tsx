"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSidebarContext } from "@/context/sidebarContext";
import Teambar from "./teambar";
import Channels from "./channel";
import { GetUserTeamsQuery } from "@/gql/types";

const SidebarMob = ({ teams }: { teams: GetUserTeamsQuery }) => {
  const { showSidebar, toggleSidebar } = useSidebarContext();
  // const [open, setOpen] = useState();

  return (
    <Sheet open={showSidebar} onOpenChange={toggleSidebar}>
      <SheetContent
        side={"left"}
        className="w-full flex gap-0 max-w-full sm:max-w-full p-0"
        showCross={false}
      >
        <Teambar teams={teams} />
        <Channels isMobile={true} />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMob;
