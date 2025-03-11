"use client";

import {
  Content,
  ContentVariants,
  DropdownItem,
  DropdownList,
  PageSection,
  Title,
} from "@patternfly/react-core";
import {
  Chatbot,
  ChatbotContent,
  ChatbotConversationHistoryNav,
  ChatbotDisplayMode,
  ChatbotFooter,
  ChatbotFootnote,
  ChatbotHeader,
  ChatbotHeaderActions,
  ChatbotHeaderMain,
  ChatbotHeaderMenu,
  ChatbotHeaderSelectorDropdown,
  ChatbotHeaderTitle,
  ChatbotWelcomePrompt,
  Conversation,
  Message,
  MessageBar,
  MessageBox,
  MessageProps,
} from "@patternfly/virtual-assistant";
import React from "react";

import { getChatResponse } from "@/actions/ai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { ChatCompletion } from "openai/src/resources/index.js";
import {
  footnoteProps,
  initialConversations,
  logoAvatar,
  userAvatar,
  welcomePrompts,
} from "./constants";

export default function ChatBot() {
  const [messages, setMessages] = React.useState<MessageProps[]>([]);
  const [selectedModel, setSelectedModel] = React.useState("Granite 7B");
  const [isSendButtonDisabled, setIsSendButtonDisabled] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [conversations, setConversations] = React.useState<
    Conversation[] | { [key: string]: Conversation[] }
  >(initialConversations);
  const [announcement, setAnnouncement] = React.useState<string>();
  const scrollToBottomRef = React.useRef<HTMLDivElement>(null);
  const displayMode = ChatbotDisplayMode.embedded;

  const onSelectModel = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined
  ) => {
    setSelectedModel(value as string);
  };

  const generateId = (() => {
    let counter = 0;
    return () => `msg-${++counter}`;
  })();

  const handlePromptClick = (prompt: { message: string }) => {
    if (prompt.message) {
      handleSend(prompt.message);
    }
  };

  const handleSend = async (message: string) => {
    setIsSendButtonDisabled(true);
    const newMessages: MessageProps[] = [];
    // we can't use structuredClone since messages contains functions, but we can't mutate
    // items that are going into state or the UI won't update correctly
    messages.forEach((message) => newMessages.push(message));
    newMessages.push({
      id: generateId(),
      role: "user",
      content: message,
      name: "User",
      avatar: userAvatar,
    });
    newMessages.push({
      id: generateId(),
      role: "bot",
      content: "API response goes here",
      name: "TheiaBot",
      avatar: logoAvatar,
      isLoading: true,
    });
    setMessages(newMessages);
    // make announcement to assistive devices that new messages have been added
    setAnnouncement(
      `Message from User: ${message}. Message from Bot is loading.`
    );

    const oaiMessages: ChatCompletionMessageParam[] = [];
    oaiMessages.push(
      {
        role: "developer",
        content:
          "Your name is TheiaBot. You are a helpful, general purpose AI assistant. You should speak with a casual, friendly tone and help the user with whatever they may need.",
      },
      { role: "user", content: message }
    );

    newMessages.slice(0, -1).forEach((message) => {
      oaiMessages.push({
        role: message.role === "user" ? "user" : "system",
        content: message.content,
      });
    });

    const chatCompletion: ChatCompletion = await getChatResponse(oaiMessages);

    const generatedMessage = chatCompletion.choices[0].message.content;
    if (!generatedMessage) {
      return;
    }

    const loadedMessages: MessageProps[] = [];
    // we can't use structuredClone since messages contains functions, but we can't mutate
    // items that are going into state or the UI won't update correctly
    newMessages.forEach((message) => loadedMessages.push(message));
    loadedMessages.pop();
    loadedMessages.push({
      id: generateId(),
      role: "bot",
      content: generatedMessage,
      name: "TheiaBot",
      avatar: logoAvatar,
      isLoading: false,
      actions: {
        // eslint-disable-next-line no-console
        positive: { onClick: () => console.log("Good response") },
        // eslint-disable-next-line no-console
        negative: { onClick: () => console.log("Bad response") },
        // eslint-disable-next-line no-console
        copy: { onClick: () => console.log("Copy") },
        // eslint-disable-next-line no-console
        share: { onClick: () => console.log("Share") },
        // eslint-disable-next-line no-console
        listen: { onClick: () => console.log("Listen") },
      },
    });
    setMessages(loadedMessages);
    // make announcement to assistive devices that new message has loaded
    setAnnouncement(`Message from Bot: API response goes here`);
    setIsSendButtonDisabled(false);
  };

  const findMatchingItems = (targetValue: string) => {
    let filteredConversations = Object.entries(initialConversations).reduce(
      (acc, [key, items]) => {
        const filteredItems = items.filter((item) =>
          item.text.toLowerCase().includes(targetValue.toLowerCase())
        );
        if (filteredItems.length > 0) {
          acc[key] = filteredItems;
        }
        return acc;
      },
      {}
    );

    // append message if no items are found
    if (Object.keys(filteredConversations).length === 0) {
      filteredConversations = [
        { id: "13", noIcon: true, text: "No results found" },
      ];
    }
    return filteredConversations;
  };

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="4xl">
        Chatbot
      </Title>
      <Content component={ContentVariants.p} isEditorial>
        This is a chatbot I made to show off the capabilities of PatternFly AI
      </Content>
      <Chatbot displayMode={displayMode}>
        <ChatbotConversationHistoryNav
          displayMode={displayMode}
          onDrawerToggle={() => {
            setIsDrawerOpen(!isDrawerOpen);
            setConversations(initialConversations);
          }}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          activeItemId="1"
          // eslint-disable-next-line no-console
          onSelectActiveItem={(e, selectedItem) =>
            console.log(`Selected history item with id ${selectedItem}`)
          }
          conversations={conversations}
          onNewChat={() => {
            setIsDrawerOpen(!isDrawerOpen);
            setMessages([]);
            setConversations(initialConversations);
          }}
          handleTextInputChange={(value: string) => {
            if (value === "") {
              setConversations(initialConversations);
            }
            // this is where you would perform search on the items in the drawer
            // and update the state
            const newConversations: { [key: string]: Conversation[] } =
              findMatchingItems(value);
            setConversations(newConversations);
          }}
          drawerContent={
            <>
              <ChatbotHeader>
                <ChatbotHeaderMain>
                  <ChatbotHeaderMenu
                    aria-expanded={isDrawerOpen}
                    onMenuToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                  />
                  <ChatbotHeaderTitle>TheiaBot</ChatbotHeaderTitle>
                </ChatbotHeaderMain>
                <ChatbotHeaderActions>
                  <ChatbotHeaderSelectorDropdown
                    value={selectedModel}
                    onSelect={onSelectModel}
                  >
                    <DropdownList>
                      <DropdownItem value="Granite 7B" key="granite">
                        Granite 7B
                      </DropdownItem>
                      <DropdownItem value="Llama 3.0" key="llama">
                        Llama 3.0
                      </DropdownItem>
                      <DropdownItem value="Mistral 3B" key="mistral">
                        Mistral 3B
                      </DropdownItem>
                    </DropdownList>
                  </ChatbotHeaderSelectorDropdown>
                </ChatbotHeaderActions>
              </ChatbotHeader>
              <ChatbotContent>
                {/* Update the announcement prop on MessageBox whenever a new message is sent
                 so that users of assistive devices receive sufficient context  */}
                <MessageBox announcement={announcement}>
                  <ChatbotWelcomePrompt
                    title="Hello, Chatbot User"
                    description="How may I help you today?"
                    prompts={welcomePrompts.map((prompt) => ({
                      ...prompt,
                      onClick: () => handlePromptClick(prompt),
                    }))}
                  />
                  {messages.map((message, index) => {
                    if (index === messages.length - 1) {
                      return (
                        <>
                          <Message key={message.id} {...message} />
                        </>
                      );
                    }
                    return <Message key={message.id} {...message} />;
                  })}
                  <div ref={scrollToBottomRef}></div>
                </MessageBox>
              </ChatbotContent>
              <ChatbotFooter>
                <MessageBar
                  onSendMessage={handleSend}
                  hasMicrophoneButton
                  isSendButtonDisabled={isSendButtonDisabled}
                />
                <ChatbotFootnote {...footnoteProps} />
              </ChatbotFooter>
            </>
          }
        ></ChatbotConversationHistoryNav>
      </Chatbot>
    </PageSection>
  );
}
