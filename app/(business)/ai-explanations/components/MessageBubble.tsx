// MessageBubble.tsx
import React from "react";
import { Bot, User, Clock } from "lucide-react";

export interface Message {
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: Date;
}

interface MessageBubbleProps {
    message: Message;
    showAvatar?: boolean;
}

export default function MessageBubble({ message, showAvatar = true }: MessageBubbleProps) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const isAI = message.sender === "ai";

    // دالة لتقليم الرسائل الطويلة جداً
    const truncateLongContent = (content: string, maxLines: number = 15): string => {
        const lines = content.split('\n');
        if (lines.length > maxLines) {
            const truncated = lines.slice(0, maxLines).join('\n');
            return `${truncated}\n\n[...]`;
        }
        return content;
    };

    // تقليم الرسالة إذا كانت طويلة جداً
    const displayContent = truncateLongContent(message.content);

    return (
        <div className={`flex gap-2 sm:gap-3 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Avatar */}
            {showAvatar && (
                <div className="flex-shrink-0 mt-1">
                    {isAI ? (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-bluelight-1 to-cyan-500 flex items-center justify-center shadow-sm">
                            <Bot className="text-white" size={14} />
                        </div>
                    ) : (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
                            <User className="text-white" size={14} />
                        </div>
                    )}
                </div>
            )}

            {/* Message Content */}
            <div className={`flex-1 min-w-0 ${!isAI && 'flex justify-end'}`}>
                <div className={`rounded-xl p-3 max-w-full ${isAI
                    ? 'bg-white/90 dark:bg-gray-800/90 border border-bluelight-1/30'
                    : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'
                    }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`font-medium text-xs truncate ${isAI ? 'text-bluelight-1' : 'text-purple-600 dark:text-purple-400'
                                }`}>
                                {isAI ? "AI Assistant" : "You"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-70 flex-shrink-0">
                            <Clock size={10} className={isAI ? 'text-bluelight-1/70' : 'text-purple-500/70'} />
                            <span className={isAI ? 'text-bluelight-1/70' : 'text-purple-500/70'}>
                                {formatTime(message.timestamp)}
                            </span>
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className={`text-sm leading-relaxed ${isAI ? 'text-gray-700 dark:text-gray-300' : 'text-gray-800 dark:text-gray-200'
                        }`}>
                        {displayContent.split('\n').map((line, idx) => {
                            if (line === '[...]') {
                                return (
                                    <div key={idx} className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">
                                        Message truncated. Click to expand.
                                    </div>
                                );
                            }
                            if (line.startsWith('**') && line.endsWith('**')) {
                                return (
                                    <div key={idx} className={`font-bold text-sm mt-2 mb-1.5 break-words ${isAI ? 'text-bluelight-1' : 'text-purple-600 dark:text-purple-400'
                                        }`}>
                                        {line.replace(/\*\*/g, '')}
                                    </div>
                                );
                            }
                            if (line.startsWith('•')) {
                                return (
                                    <div key={idx} className="flex gap-1.5 ml-1 my-1 break-words">
                                        <span className={isAI ? 'text-bluelight-1 flex-shrink-0' : 'text-purple-600 flex-shrink-0'}>•</span>
                                        <span className="break-words">{line.substring(1).trim()}</span>
                                    </div>
                                );
                            }
                            if (line.startsWith('✓')) {
                                return (
                                    <div key={idx} className="flex gap-1.5 ml-1 my-1 break-words">
                                        <span className="text-green-500 flex-shrink-0">✓</span>
                                        <span className="break-words">{line.substring(1).trim()}</span>
                                    </div>
                                );
                            }
                            if (line.match(/^\d+\./)) {
                                return (
                                    <div key={idx} className="flex gap-1.5 ml-1 my-1 break-words">
                                        <span className={`font-semibold flex-shrink-0 ${isAI ? 'text-bluelight-1' : 'text-purple-600'
                                            }`}>
                                            {line.match(/^\d+\./)?.[0]}
                                        </span>
                                        <span className="break-words">{line.replace(/^\d+\./, '').trim()}</span>
                                    </div>
                                );
                            }
                            return line ? <p key={idx} className="my-1 break-words">{line}</p> : <br key={idx} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}