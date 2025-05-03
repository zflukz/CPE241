import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchIcon = () => {
  return (
    <button className="relative flex items-center space-x-2 px-3 py-2 text-[#C84B2F] rounded-md group">
      <span className="text-[16px] font-semibold pr-[15px] text-[#C84B2F] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Change Search
      </span>
      <FaSearch className="text-[#C84B2F] " />
    </button>
  );
};

export default SearchIcon;
