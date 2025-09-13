
import React, { useState, useEffect, useRef } from "react";
import { agentSDK } from "@/agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "../components/chat/MessageBubble";
import { Send, CornerDownLeft, Bot, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function SupportChat() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const initializeConversation = async () => {
      try {
        const conv = await agentSDK.createConversation({
          agent_name: "booking_assistant",
          metadata: {
            name: "User Support Chat"
          }
        });
        // Add an initial greeting from the assistant
        const initialMessage = {
          role: "assistant",
          content: "Hello! I'm the BookLingo Booking Assistant. How can I help you with your booking needs today?"
        };
        setConversation(conv);
        setMessages([initialMessage]);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize conversation:", error);
        // Handle error state in UI
      }
    };
    initializeConversation();
  }, []);

  useEffect(() => {
    if (!conversation) return;

    const unsubscribe = agentSDK.subscribeToConversation(conversation.id, (data) => {
      // Filter out the initial greeting if it's coming from the stream
      const updatedMessages = data.messages.filter((msg) => msg.role !== 'assistant' || msg.content !== "Hello! I'm the BookLingo Booking Assistant. How can I help you with your booking needs today?");

      // Combine initial message with streamed messages
      const initialMessage = {
        role: "assistant",
        content: "Hello! I'm the BookLingo Booking Assistant. How can I help you with your booking needs today?"
      };

      setMessages([initialMessage, ...updatedMessages]);
      setIsLoading(data.status === 'running');
    });

    return () => unsubscribe();
  }, [conversation]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (currentMessage.trim() === "" || !conversation) return;

    const userMessage = { role: "user", content: currentMessage };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    await agentSDK.addMessage(conversation, userMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading && !conversation) {
    return <div className="flex items-center justify-center h-screen bg-blue-50">Loading Chat...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl">
                <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                           <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Bot className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle>Booking Assistant</CardTitle>
                                <CardDescription>Your guide to booking interpretation services</CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Link to={createPageUrl("Home")}>
                                <Button variant="outline" size="sm" className="bg-blue-500 text-slate-50 px-3 text-sm font-medium justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground h-9 rounded-md flex items-center space-x-2">
                                    <Home className="h-4 w-4" />
                                    <span className="hidden sm:inline">Home</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-0 overflow-hidden">
                    <ScrollArea className="h-full" ref={scrollAreaRef}>
                        <div className="p-6">
                            {messages.map((msg, index) =>
              <MessageBubble key={index} message={msg} />
              )}
                            {isLoading && messages[messages.length - 1]?.role === 'user' &&
              <MessageBubble message={{ role: 'assistant', content: '...' }} />
              }
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="border-t p-4">
                    <div className="relative">
                        <Input
              placeholder="Ask about booking services..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-20 h-12"
              disabled={isLoading} />

                        <div className="bg-slate-50 absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center">
                            <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 mr-2">
                                <span className="text-xs"></span><CornerDownLeft className="w-3 h-3" />
                            </kbd>
                            <Button onClick={handleSendMessage} disabled={isLoading || !currentMessage.trim()} size="icon" className="h-8 w-8">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                     <p className="text-xs text-center text-gray-400 mt-2">
                        This is an AI assistant. Please verify important information.
                    </p>
                </div>
            </Card>
        </div>);

}