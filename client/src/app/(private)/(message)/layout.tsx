import PrivProviders from "@/components/providers/private-providers";
import Sidebar from "@/components/sidebar";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-screen h-screen max-h-screen max-w-[100vw]  overflow-hidden">
      <Sidebar />
      {children}
    </main>
  );
}
