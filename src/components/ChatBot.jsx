import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import Button from './Button';
import { Send, Sparkles, Loader2, AlertCircle, Settings, CheckCircle } from 'lucide-react';
import { analyzeWithGemini, setGeminiApiKey } from '../services/gemini';

const ChatBot = ({ contextFiles = [] }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI assistant. Upload some files (PDF, PSD, Video, or Audio), and I'll help you analyze them. What would you like to know?", sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [apiKeyInput, setApiKeyInput] = useState(localStorage.getItem('VITE_GEMINI_API_KEY') || '');
    const [keySaved, setKeySaved] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSaveKey = () => {
        setGeminiApiKey(apiKeyInput);
        setKeySaved(true);
        setTimeout(() => setKeySaved(false), 2000);
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isTyping) return;

        setError(null);
        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Real API Call to Gemini
            const aiResponse = await analyzeWithGemini(contextFiles, input);

            const botMessage = {
                id: Date.now() + 1,
                text: aiResponse,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error("Chat Error:", err);
            setError(err.message || "Something went wrong while communicating with Gemini.");

            const errorMessage = {
                id: Date.now() + 1,
                text: `Error: ${err.message || "Failed to get a response. Please check your API key and connection."}`,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
            <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--color-success)', borderRadius: 'var(--radius-full)', boxShadow: '0 0 8px var(--color-success)' }}></div>
                    <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: '600' }}>AI Assistant</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    {contextFiles.length > 0 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', padding: '2px 8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-full)' }}>
                            {contextFiles.length} files in context
                        </span>
                    )}
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        style={{ color: showSettings ? 'var(--color-accent-primary)' : 'var(--color-text-muted)', padding: '6px', borderRadius: 'var(--radius-sm)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        onClick={() => setMessages([{ id: Date.now(), text: "Chat cleared. How can I help you now?", sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])}
                        style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => { e.target.style.color = 'var(--color-text-primary)'; e.target.style.borderColor = 'var(--color-text-muted)'; }}
                        onMouseLeave={(e) => { e.target.style.color = 'var(--color-text-muted)'; e.target.style.borderColor = 'var(--color-border)'; }}
                    >
                        Clear Chat
                    </button>
                </div>
            </div>

            {showSettings && (
                <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-bg-tertiary)', borderBottom: '1px solid var(--color-border)', animation: 'fadeIn 0.3s ease' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: '600' }}>GEMINI API KEY</label>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <input
                                type="password"
                                value={apiKeyInput}
                                onChange={(e) => setApiKeyInput(e.target.value)}
                                placeholder="AIza..."
                                style={{
                                    flex: 1,
                                    background: 'var(--color-bg-secondary)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '0.875rem'
                                }}
                            />
                            <button
                                onClick={handleSaveKey}
                                style={{
                                    background: keySaved ? 'var(--color-success)' : 'var(--color-accent-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: '4px 12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                {keySaved ? <><CheckCircle size={14} /> Saved</> : 'Save Key'}
                            </button>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', margin: 0 }}>
                            This key is stored only in your browser's local storage.
                        </p>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-lg)' }}>
                {messages.map(msg => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: 'var(--spacing-md)' }}>
                        <Loader2 size={14} className="animate-spin" /> Gemini is analyzing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {error && !error.includes("Gemini API Key") && (
                <div style={{ padding: 'var(--spacing-sm) var(--spacing-md)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}

            <div style={{ padding: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={contextFiles.length > 0 ? "Ask about your files..." : "Upload files to start analysis..."}
                        style={{
                            flex: 1,
                            background: 'var(--color-bg-tertiary)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            color: 'var(--color-text-primary)',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                    <Button onClick={handleSendMessage} disabled={isTyping} style={{ padding: 'var(--spacing-sm)' }}>
                        <Send size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
