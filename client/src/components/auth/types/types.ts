export type TAuthState = "login" | "signup";
export interface TAuthComponentProps {
  toggleAuthState: (type: TAuthState) => void;
}

