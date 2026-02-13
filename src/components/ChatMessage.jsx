import React from 'react';
import { Bot, User as UserIcon } from 'lucide-react';

const ChatMessage = ({ message }) => {
    const isBot = message.sender === 'bot';

    const containerStyle = {
        display: 'flex',
        gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-lg)',
        flexDirection: isBot ? 'row' : 'row-reverse',
        animation: 'fadeIn var(--transition-normal) forwards',
    };

    const bubbleStyle = {
        maxWidth: '80%',
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--radius-lg)',
        background: isBot ? 'var(--color-bg-tertiary)' : 'var(--color-accent-primary)',
        color: 'var(--color-text-primary)',
        fontSize: '0.9375rem',
        lineHeight: '1.5',
        boxShadow: isBot ? 'none' : '0 4px 15px var(--color-accent-glow)',
        border: isBot ? '1px solid var(--color-border)' : 'none',
        borderBottomLeftRadius: isBot ? '0' : 'var(--radius-lg)',
        borderBottomRightRadius: !isBot ? '0' : 'var(--radius-lg)',
    };

    const iconContainerStyle = {
        width: '32px',
        height: '32px',
        borderRadius: 'var(--radius-full)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isBot ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.1)',
        color: isBot ? 'var(--color-accent-primary)' : '#ffffff',
        flexShrink: 0,
    };

    return (
        <div style={containerStyle}>
            <div style={iconContainerStyle}>
                {isBot ? <Bot size={18} /> : <UserIcon size={18} />}
            </div>
            <div style={bubbleStyle}>
                {message.text}
                {message.timestamp && (
                    <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '4px', textAlign: isBot ? 'left' : 'right' }}>
                        {message.timestamp}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
