'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/me");
  }, []);

  return <div>sad</div>;
}
