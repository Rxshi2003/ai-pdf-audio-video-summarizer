import React from 'react';

const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
    const baseStyle = {
        padding: 'var(--spacing-lg)',
        borderRadius: 'var(--radius-lg)',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
    };

    return (
        <div
            className={`glass-panel ${className}`}
            style={baseStyle}
            {...props}
            onMouseEnter={(e) => {
                if (hoverEffect) {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px -10px rgba(99, 102, 241, 0.3)';
                    e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
                }
            }}
            onMouseLeave={(e) => {
                if (hoverEffect) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            }}
        >
            {children}
        </div>
    );
};

export default Card;
