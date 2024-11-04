import React from 'react';

interface searchBarProps {
  searchWord: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ searchWord, onChange }: searchBarProps) {
  return (
    <input
      type="text"
      value={searchWord}
      onChange={onChange}
      className="w-full "
      placeholder="검색어를 입력해주세요"
    ></input>
  );
}

export default SearchBar;
