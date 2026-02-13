import React from 'react';

const Input = ({
    label,
    error,
    icon: Icon,
    className = '',
    ...props
}) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xs)',
        width: '100%',
    };

    const inputWrapperStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    };

    const inputStyle = {
        width: '100%',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        paddingLeft: Icon ? 'var(--spacing-xl)' : 'var(--spacing-md)',
        borderRadius: 'var(--radius-md)',
        border: error ? '1px solid var(--color-error)' : '1px solid var(--color-border)',
        background: 'var(--color-bg-tertiary)',
        color: 'var(--color-text-primary)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color var(--transition-fast)',
    };

    const labelStyle = {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        fontWeight: '500',
    };

    const iconStyle = {
        position: 'absolute',
        left: 'var(--spacing-sm)',
        color: 'var(--color-text-muted)',
        pointerEvents: 'none',
    };

    const errorStyle = {
        fontSize: '0.75rem',
        color: 'var(--color-error)',
    };

    return (
        <div style={containerStyle} className={className}>
            {label && <label style={labelStyle}>{label}</label>}
            <div style={inputWrapperStyle}>
                {Icon && <Icon size={18} style={iconStyle} />}
                <input
                    style={inputStyle}
                    {...props}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-accent-primary)';
                        if (props.onFocus) props.onFocus(e);
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = error ? 'var(--color-error)' : 'var(--color-border)';
                        if (props.onBlur) props.onBlur(e);
                    }}
                />
            </div>
            {error && <span style={errorStyle}>{error}</span>}
        </div>
    );
};

export default Input;
