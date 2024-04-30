import { useChat } from "ai/react";
interface ChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatBox({ open, onClose }: ChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  return <div></div>;
}
