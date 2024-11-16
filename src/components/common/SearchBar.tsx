import React from 'react';

function SearchBar() {
  return (
    <div className="w-6/12 gap-2 flex">
      <input className="w-full" placeholder="통합 검색" />
      <button>검색</button>
    </div>
  );
}

export default SearchBar;
