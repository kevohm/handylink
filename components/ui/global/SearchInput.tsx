"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("s") || "";
  useEffect(() => {
    setSearchQuery(queryParam)
  }, [queryParam]);
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return; // avoid navigating on empty input

    router.push(`/search-results?s=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="flex items-center justify-center relative w-full">
      <input
        type="text"
        placeholder="E.g., 'Kitchen helper, friendly male, $100 budget.'"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="input-field-rounded-left w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-green-light"
      />
      <button
        onClick={handleSearch}
        className="btn-rounded-right btn-primary border-3 border-green-light bg-orange-600 text-white px-4 py-2 rounded-r-lg outline-none hover:bg-green-light transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
