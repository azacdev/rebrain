import { useState } from "react";

import ChatBox from "./chat-box";
import { Bot } from "lucide-react";
import { Button } from "./ui/button";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Bot size={20} className="mr-2" />
        AI Chat
      </Button>
      <ChatBox open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
