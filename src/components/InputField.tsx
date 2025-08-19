import React, { useState } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
}) => {
  const [internalValue, setInternalValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange && onChange(e);
  };

  const baseStyles = 'rounded border px-3 py-2 outline-none w-full';
  const variantStyles: Record<string, string> = {
    filled: 'bg-gray-100 border-gray-100',
    outlined: 'bg-white border-gray-300',
    ghost: 'bg-transparent border-transparent',
  };
  const sizeStyles: Record<string, string> = {
    sm: 'text-sm py-1',
    md: 'text-base py-2',
    lg: 'text-lg py-3',
  };
  const invalidStyle = invalid ? 'border-red-500' : '';

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium">{label}</label>}
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${invalidStyle}`}
      />
      {helperText && !invalid && <p className="text-gray-500 text-sm">{helperText}</p>}
      {invalid && errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
