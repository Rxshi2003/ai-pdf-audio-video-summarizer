import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    ...props
}) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-fast)',
        gap: 'var(--spacing-sm)',
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
            color: '#ffffff',
            boxShadow: '0 4px 15px var(--color-accent-glow)',
        },
        secondary: {
            background: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
        },
        outline: {
            background: 'transparent',
            border: '1px solid var(--color-accent-primary)',
            color: 'var(--color-accent-primary)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--color-text-secondary)',
        }
    };

    const sizes = {
        sm: {
            padding: 'var(--spacing-xs) var(--spacing-sm)',
            fontSize: '0.875rem',
        },
        md: {
            padding: 'var(--spacing-sm) var(--spacing-md)',
            fontSize: '1rem',
        },
        lg: {
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '1.125rem',
        },
    };

    const style = {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        opacity: props.disabled || isLoading ? 0.7 : 1,
        cursor: props.disabled || isLoading ? 'not-allowed' : 'pointer',
    };

    return (
        <button style={style} disabled={isLoading || props.disabled} className={className} {...props}>
            {isLoading && <Loader2 className="animate-spin" size={16} />}
            {children}
        </button>
    );
};

export default Button;
