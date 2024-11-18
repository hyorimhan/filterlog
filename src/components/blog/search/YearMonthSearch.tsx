import useSearch from '@/zustand/useSearch';
import React from 'react';

function YearMonthSearch() {
  const {
    setSelectedYear,
    selectedYear,
    setCurrentPage,
    selectedMonth,
    setSelectedMonth,
  } = useSearch();
  const yearOptions = Array.from(
    { length: Number(selectedYear) - 2024 + 1 },
    (_, i) => (2024 + i).toString()
  );
  const monthOptions = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, '0')
  );
  return (
    <div className="flex justify-center mt-1 border-2 border-custom-green-400 p-1 rounded-lg">
      <select
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
          setCurrentPage(0);
        }}
      >
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year}년
          </option>
        ))}
      </select>
      <select
        value={selectedMonth}
        onChange={(e) => {
          setSelectedMonth(e.target.value);
          setCurrentPage(0);
        }}
      >
        {monthOptions.map((month) => (
          <option key={month} value={month}>
            {month}월
          </option>
        ))}
      </select>
      <span className="ml-2">글 보기</span>
    </div>
  );
}

export default YearMonthSearch;
