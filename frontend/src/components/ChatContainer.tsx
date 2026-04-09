import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
          {messages.length  > 0 ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {
                messages.map(msg  => (
                  <div key={msg._id} className={`chat ${msg.sederId === authUser._id ? "chat-end" : "chat-start"}`}>
                    <div className={`chat-bubble relative ${msg.sederId === authUser._id ? 'bg-cyan-600 text-white' : "bg-slate-800 text-slate-200"}`}>
                      {msg.image && (
                        <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover"/>
                      )}
                      {msg.text && <p className="mt-2">{msg.text}</p>}
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <NoChatHistoryPlaceholder name={selectedUser.fullName} />
          )}
      </div>
    </>
  );
}

export default ChatContainer;