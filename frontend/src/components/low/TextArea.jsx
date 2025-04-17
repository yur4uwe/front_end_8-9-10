import React from 'react';
import './TextArea.css';

/**
 * Text input component
 * @param {Object} props
 * @param {string} props.name The label for the input.
 * @param {string} [props.value] The current input value.
 * @param {string} [props.className] Additional CSS classes.
 * @param {string} [props.placeholder] Placeholder text.
 * @param {function} [props.onFocus] Focus handler.
 * @param {function} [props.onBlur] Blur handler.
 * @param {function} [props.onChange] Change handler.
 */
const TextArea = ({ type, name, value, className, placeholder, onFocus, onBlur, onChange, color }) => {
    const inputId = name ? name.toLowerCase().replace(/\s+/g, '-') : undefined;
    return (
        <div className={`text-area ${className ?? ''}`}>
            <input
                id={inputId}
                type={type ?? 'text'}
                className="text-area-input"
                placeholder={placeholder ?? 'Type here...'}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
                value={value}   // For a controlled component
            />
            {name && <label htmlFor={inputId} className="text-area-title" style={{ background: color }}>{name}</label>}
        </div>
    );
};

export default TextArea;