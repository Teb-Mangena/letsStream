import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { ArrowLeftIcon } from "lucide-react";

import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageComposer,
  Thread,
} from "stream-chat-react";
import toast from "react-hot-toast";
import { StreamChat } from "stream-chat";
import CallButton from "../components/CallButton";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

function ChatPage() {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { checkAuthQuery } = useAuth();
  const authUser = checkAuthQuery.data?.user;

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        await client.connectUser(user, tokenData.token);

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initChat();

    return () => {
      // Clean up Stream client on unmount so switching chats doesn't leak connections
      if (chatClient) {
        chatClient.disconnectUser().catch(() => { });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (isLoading || !chatClient || !channel) return <PageLoader />

  return (
    <div className="relative h-[calc(100vh-4rem)] bg-neutral-950 text-white overflow-hidden">
      {/* grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* back link */}
      <Link
        to="/"
        className="fixed top-20 left-4 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-neutral-950/80 px-3 py-2 text-xs font-medium text-white/60 backdrop-blur-md transition-colors hover:border-lime-300/40 hover:text-lime-300 lg:left-72"
      >
        <ArrowLeftIcon className="size-3.5" />
        <span className="hidden sm:inline">Back</span>
      </Link>

      <div className="relative h-full">
        <Chat client={chatClient} theme="messaging dark">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageComposer />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>

      <CallButton handleVideoCall={handleVideoCall} />
    </div>
  );
}

export default ChatPage;