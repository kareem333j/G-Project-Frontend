// app/(business)/ai-explanations/page.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getModelInsights } from "../lib/api";
import ChatContainer from "./components/ChatContainer";
import MessageList from "./components/MessageList";
import type { Message } from "./components/MessageList"; // استيراد النوع بشكل صحيح
import ChatInput from "./components/ChatInput";
import ModelInfo from "./components/ModelInfo";
import FileAttachment from "./components/FileAttachment";

export default function AIExplanationsPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hello! I'm your AI Health Assistant. I can help you analyze patient data, explain medical insights, and answer health-related questions. How can I assist you today?",
            sender: "ai",
            timestamp: new Date(Date.now() - 60000),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [insights, setInsights] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const examplePrompts = [
        "Analyze diabetes risk for age 45",
        "Explain blood pressure 130/85",
        "Diet recommendations for heart patients",
        "How to interpret cholesterol test?",
        "Anxiety symptoms and management"
    ];

    // Load model insights
    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const data = await getModelInsights();
                if (!mounted) return;
                setInsights(data);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (isAtBottom) {
            scrollToBottom();
        }
    }, [messages, isTyping, isAtBottom]);

    // Check if user is at bottom
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
            setIsAtBottom(isBottom);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }, 100);
    }, []);

    const handleSend = useCallback(() => {
        if (!input.trim() && !attachedFile) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input || (attachedFile ? `📎 Attached file: ${attachedFile.name}` : ""),
            sender: "user",
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setAttachedFile(null);
        setIsTyping(true);
        setIsAtBottom(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: generateAIResponse(input),
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    }, [input, attachedFile]);

    const generateAIResponse = (query: string): string => {
        const queryLower = query.toLowerCase();

        if (queryLower.includes("diabetes") || queryLower.includes("sugar")) {
            return `🔬 **Diabetes Risk Analysis**\n\n**Normal Levels**:\n• **Fasting Blood Sugar**: < 100 mg/dL\n• **HbA1c**: < 5.7%\n• **Post-meal**: < 140 mg/dL\n\n**Main Risk Factors**:\n1. BMI > 30\n2. Family history\n3. Sedentary lifestyle\n4. Age above 45\n\n**Recommendations**:\n✓ Regular checkups every 6 months\n✓ Balanced diet\n✓ 30 mins daily exercise\n✓ Weight management\n\nDo you have specific values for analysis?`;
        }

        if (queryLower.includes("blood pressure") || queryLower.includes("bp")) {
            return `❤️ **Blood Pressure Guide**\n\n**Classification**:\n• Normal: < 120/80\n• Elevated: 120-129/<80\n• Stage 1: 130-139/80-89\n• Stage 2: ≥ 140/≥ 90\n\n**Management Tips**:\n✓ Reduce salt (<1500mg/day)\n✓ Regular aerobic exercise\n✓ Stress management\n✓ Avoid smoking\n✓ Healthy weight\n\nNeed analysis of specific readings?`;
        }

        if (queryLower.includes("patient") || queryLower.includes("analysis")) {
            return `📊 **Patient Data Analysis**\n\nFor comprehensive analysis, I need:\n1. **Patient ID** or medical record\n2. **Lab Results**: sugar, cholesterol, enzymes\n3. **Vitals**: BP, weight, height\n4. **Medical History**: medications, past conditions\n\n**Upload Options**:\n• Excel/CSV file\n• Manual entry\n• Connect to medical system\n\nHow would you prefer to provide data?`;
        }

        return `🤖 **AI Health Assistant**\n\nI can help with:\n• Disease risk analysis\n• Medical test interpretation\n• Treatment recommendations\n• Personalized health guidance\n\n**Suggested Questions**:\n• "Analyze diabetes risk for age 50"\n• "Explain blood pressure reading 135/85"\n• "Best diet for heart patients"\n• "Cholesterol test interpretation"\n\nAsk your specific question for the best answer!`;
    };

    const handleFileUpload = useCallback((file: File) => {
        setAttachedFile(file);
    }, []);

    const removeAttachment = useCallback(() => {
        setAttachedFile(null);
    }, []);

    const handlePromptClick = useCallback((prompt: string) => {
        setInput(prompt);
    }, []);

    return (
        <div className="w-full min-h-screen p-4 sm:p-6">


            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Area - 2/3 width */}
                <div className="lg:col-span-2">
                    <ChatContainer
                        messageCount={messages.length}
                        isAtBottom={isAtBottom}
                        onScrollToBottom={scrollToBottom}
                    >
                        <MessageList
                            messages={messages}
                            isTyping={isTyping}
                            examplePrompts={examplePrompts}
                            onPromptClick={handlePromptClick}
                        >
                            <div ref={messagesEndRef} className="h-4" />
                        </MessageList>
                    </ChatContainer>

                    {/* Attached File Preview */}
                    {attachedFile && (
                        <FileAttachment
                            file={attachedFile}
                            onRemove={removeAttachment}
                        />
                    )}

                    {/* Input Area */}
                    <div className="mt-1">
                        <ChatInput
                            value={input} // تغيير من input إلى value
                            onChange={setInput} // تغيير من onInputChange إلى onChange
                            onSend={handleSend}
                            onFileUpload={handleFileUpload}
                            attachedFile={attachedFile}
                            disabled={isTyping}
                        />
                    </div>
                </div>

                {/* Model Info - 1/3 width */}
                <div className="space-y-6">
                    <ModelInfo
                        accuracy={insights?.accuracy || 87}
                        modelVersion={insights?.modelVersion || "2.1"}
                        lastUpdated={insights?.lastUpdated || new Date().toISOString()}
                        features={insights?.features || []}
                        loading={loading}
                    />

                    {/* Quick Tips */}

                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-4 text-center">
                <p className="text-xs text-bluelight-1/50">
                    AI Medical Assistant • Responses may not be accurate • Consult your doctor
                </p>
            </div>
        </div>
    );
}