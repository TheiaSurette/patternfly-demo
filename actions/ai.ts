"use server";

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function getChatResponse(messages: ChatCompletionMessageParam[]) {
  const openai = new OpenAI();

  return await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    store: true,
  });
}
