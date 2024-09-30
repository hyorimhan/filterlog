import Login from '@/components/auth/Login';
import React from 'react';
import 'xp.css/dist/XP.css';

const HomePage = () => {
  return (
    <div className="w-[1280px] mx-auto">
      <div className="h-[150px] bg-custom-green-500 mt-2 "></div>
      <div className="flex mt-1">
        <section className="border-gray-300 h-[280px] w-[230px] bg-slate-300">
          <Login />
        </section>
        <section className="border-gray-300 w-[720px] h-[280px] bg-slate-300 mx-auto"></section>
        <section className="border-gray-300 h-[280px] w-[320px] bg-slate-300"></section>
      </div>
    </div>
  );
};

export default HomePage;
