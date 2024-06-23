import { ReactNode, createContext, useContext, useState } from "react";

interface ContextProps {
  chatName: string;
  changeChatName: (chatName: string) => void;
}

 const ChatHeadContext = createContext<ContextProps>({
  chatName: "",
  changeChatName: () => {},
});

export const ChatHeadContextProvider = ({ children }: { children: ReactNode }) => {
  const [chatName, setChatName] = useState("");
  const changeChatName = (chatName: string) => {
    setChatName(chatName);
  };

  return (
    <ChatHeadContext.Provider value={{ chatName, changeChatName }}>
      {children}
    </ChatHeadContext.Provider>
  );
};

export const useChatHead = () => {
  return useContext(ChatHeadContext);
};
