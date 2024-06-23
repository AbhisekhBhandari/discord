import localFont from "next/font/local";

export const ggSans2 = localFont({
  src: [
    {
      path: "./gg-sans-2/bold.ttf",
      weight: "700",
    },
    {
      path: "./gg-sans-2/medium.ttf",
      weight: "500",
    },
    {
      path: "./gg-sans-2/semiBold.ttf",
      weight: "600",
    },
    {
      path: "./gg-sans-2/regular.ttf",
      weight: "400",
    },
  ],
});
