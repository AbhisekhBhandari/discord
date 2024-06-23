import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Playlist, USER_SETTINGS } from "./mock";
import { LogoutButton } from "./logout-button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function SettingsSidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <ScrollArea className="h-screen px-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              User Settings
            </h2>
            <div className="space-y-1">
              {USER_SETTINGS.map((setting) => (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  key={setting.title}
                >
                  {setting.title}
                </Button>
              ))}
            </div>
          </div>

          <div className="py-2 px-3">
            <LogoutButton />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
