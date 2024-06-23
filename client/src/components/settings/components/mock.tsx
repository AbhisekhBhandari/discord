export type Playlist = (typeof playlists)[number];

export const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
];

interface IUserSettings {
  title: string;
  component: React.ReactNode;
}

export const USER_SETTINGS: IUserSettings[] = [
  {
    title: "My Account",
    component: <div>My Account</div>,
  },
  {
    title: "Profiles",
    component: <div>Component</div>,
  },
  {
    title: "Privacy & Safety",
    component: <div>Privacy and Safety</div>,
  },
];
