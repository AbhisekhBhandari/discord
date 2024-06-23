import PrivProviders from "@/components/providers/private-providers";
import React from "react";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <PrivProviders>
    
    
    {children}
    </PrivProviders>;
}

export default PrivateLayout;
