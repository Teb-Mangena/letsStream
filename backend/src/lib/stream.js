import { StreamChat } from "stream-chat";
import { ENV } from "../config/env.js";

const { STEAM_API_KEY, STEAM_API_SECRET } = ENV;

const streamClient = StreamChat.getInstance(STEAM_API_KEY, STEAM_API_SECRET);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);

    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error; // let caller handle it
  }
};

export const generateStreamToken = (userId) => {
  try {
    // ensure userId is string
    const userIdStr = userId.toString();

    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.log("Error generating stream token", error);
  }
};
