export const formatOpenAIChatHistory = (messages: Array<string>) =>
  messages.map((text, index) => ({
    role: index % 2 === 0 ? "user" : "assistant",
    content: text,
  }));

export const formatConversationHistory = (messages: Array<string>) => {
  return messages
    .map((message, i) => {
      if (i % 2 === 0) {
        return `Human: ${message}`;
      } else {
        return `AI: ${message}`;
      }
    })
    .join("\n ");
};
