import { SubUser } from "@/gql/types";
import { useGetUser } from "@/query-hooks/user";
import { useRouter } from "next/navigation";
import { createContext, use, useContext, useEffect, useState } from "react";

interface IAuthContextProps {
  user?: SubUser;
  loading: boolean;
}
const AuthContext = createContext({} as IAuthContextProps);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   const [user, setUser] = useState();

  const { data, isLoading, error } = useGetUser();
  const navigate = useRouter();

  // if (isLoading) return <p>It is loading user.</p>;
  // if (error) {
  //   navigate.push("/login");
  // }
  return (
    <AuthContext.Provider value={{ user: data?.getUser, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
