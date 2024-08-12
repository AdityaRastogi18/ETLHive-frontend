import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="flex items-center w-3/4 max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by name, roll number or subject name..."
        className="flex-1 px-4 py-2 border-none focus:outline-none"
      />

      {query ? (
        <button
          onClick={handleClear}
          className="p-2 mr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      ) : (
        <button
          onClick={handleSearch}
          className="p-2 mr-3 text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
