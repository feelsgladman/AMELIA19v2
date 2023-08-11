import { adminDb } from "@/firebase/firebaseAdmin";
import query from "@/utils/queryApi"; // Ensure this queryApi function is updated for GPT-3.5 Turbo
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model = "gpt-3.5-turbo", session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please Provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat Id" });
    return;
  }

  // ChatGpt Query
  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || prompt,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      email: "ChatGPT",
      avatar:
        "https://drive.google.com/uc?export=download&id=1d5FDbM4ZIhrtjjagQ9eSOY478rS2X-ZM",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.uid)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
