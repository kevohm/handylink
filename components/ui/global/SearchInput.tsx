"use client";
import { useState } from "react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex items-center justify-center relative">
      <input
        type="text"
        placeholder="E.g., 'Kitchen helper, friendly male, $100 budget.'"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input-field-rounded-left"
      />
      <button className="btn-rounded-right btn-primary border-3 border-green-light">
        Search
      </button>
    </div>
  );
};

export default SearchInput;
