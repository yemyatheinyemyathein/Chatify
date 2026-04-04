import { useAuthStore } from "../store/useAuthStore"

const ChatPage = () => {
  const {LogOut} = useAuthStore();
  return (
    <div className="z-10"><p>Chat Page</p>
      <button className="" onClick={LogOut}>Log out</button>
    </div>
  )
}

export default ChatPage