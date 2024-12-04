'use client';
import useSearch from '@/zustand/useSearch';
import React from 'react';

function SearchBar() {
  const { searchWord, setSearchWord } = useSearch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };
  return (
    <input
      type="text"
      value={searchWord}
      onChange={handleSearch}
      className="w-full "
      placeholder="검색어를 입력해주세요"
    ></input>
  );
}

export default SearchBar;
