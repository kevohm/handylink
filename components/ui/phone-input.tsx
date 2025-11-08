"use client";

import React, { useState, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
 onValueChange?: (value: string) => void; 
}

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+254", country: "KE" },
  { code: "+61", country: "AU" },
  { code: "+81", country: "JP" },
];

export function PhoneInput({
  label,
  value = "",
  className = "",
  required,
  onValueChange,
  placeholder,
  ...rest
}: PhoneInputProps) {
  const [selectedCode, setSelectedCode] = useState("+254");
  const [phone, setPhone] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ""); // Only digits
    setPhone(inputValue);
    if (onValueChange) onValueChange(`${selectedCode}${inputValue}`);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(e.target.value);
    if  (onValueChange) onValueChange(`${e.target.value}${phone}`);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="capitalize block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex items-center space-x-2">
        <select
          value={selectedCode}
          onChange={handleCodeChange}
          className="border border-gray-300 bg-white rounded-xl px-2 py-2 focus:outline-none focus:border-green-light"
        >
          {countryCodes.map((c) => (
            <option key={c.code} value={c.code}>
              {c.country} {c.code}
            </option>
          ))}
        </select>

        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-green-light transition ${className}`}
          placeholder="e.g. 712345678"
          required={required}
          {...rest} // Pass additional props like disabled, name, autoComplete, etc.
        />
      </div>
    </div>
  );
}
