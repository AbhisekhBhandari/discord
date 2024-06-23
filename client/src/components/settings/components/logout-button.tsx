import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/query-hooks/user";
import Image from "next/image";
import Spinner from "@/assets/Spinner.gif";

export function LogoutButton() {
  const { mutate, isPending } = useLogout();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start font-semibold text-md"
        >
          Log Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive w-32"
            onClick={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            {isPending ? (
              <Image
                className="h-6 w-6"
                alt="spinner"
                src={Spinner}
                fetchPriority="high"
              />
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
