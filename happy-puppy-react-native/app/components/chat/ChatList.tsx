import { ChatType } from "@/src/types/chat/chat";
import Chat from "./Chat";

type Props = {
  userId: number;
  chatList: ChatType[];
};

const ChatList = (props: Props) => {
  const { userId, chatList } = props;

  return (
    <>
      {chatList.map((message, index) => {
        const isSameSender = index > 0 && chatList[index - 1].id === message.id;

        const isMine = message.id === userId;

        return <Chat key={index} avatarImage={message.avatarImage} isMine={isMine} text={message.text} isSameSender={isSameSender} />;
      })}
    </>
  );
};

export default ChatList;
