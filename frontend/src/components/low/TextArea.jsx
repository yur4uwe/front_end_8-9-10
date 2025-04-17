import React from 'react';
import './TextArea.css';

/**
 * A simple controlled text input component.
 * 
 * @param {object} props
 * @param {string} props.name - The label/name for the input.
 * @param {string} props.value - The current value.
 * @param {string} props.type - The input type (e.g. "text", "email", "tel").
 * @param {string} props.placeholder - The placeholder text.
 * @param {function} props.onChange - Change handler.
 * @param {string} [props.color] - Text color.
 * @returns {JSX.Element}
 */
const TextArea = ({ name, value, type, placeholder, onChange, color }) => {
    return (
        <div className="text-area">
            {name && (
                <label className="text-area-title" style={{ backgroundColor: color }}>
                    {name}
                </label>
            )}
            <input
                className="text-area-input"
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
            />
        </div>
    );
};

export default TextArea;