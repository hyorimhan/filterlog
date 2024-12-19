'use client';
import Image from 'next/image';
import Logo from '../Logo';
import { useState, useEffect } from 'react';

function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const period = hours >= 12 ? '오후' : '오전';
      const displayHours = hours > 12 ? hours - 12 : hours || 12;

      return `${period} ${displayHours}:${String(now.getMinutes()).padStart(
        2,
        '0'
      )}`;
    };

    setCurrentTime(formatTime());

    const interval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="z-20 h-[30px] bg-[linear-gradient(rgb(31,47,134)_0px,rgb(49,101,196)_3%,rgb(54,130,229)_6%,rgb(68,144,230)_10%,rgb(56,131,229)_12%,rgb(43,113,224)_15%,rgb(38,99,218)_18%,rgb(35,91,214)_20%,rgb(34,88,213)_23%,rgb(33,87,214)_38%,rgb(36,93,219)_54%,rgb(37,98,223)_86%,rgb(36,95,220)_89%,rgb(33,88,212)_92%,rgb(29,78,192)_95%,rgb(25,65,165)_98%)] absolute bottom-0 right-0 left-0 flex">
      <div className="flex-1 overflow-hidden flex items-center">
        <div className="relative ">
          <Image
            src={'/main/startBtn.png'}
            alt="startBtn"
            width={110}
            height={100}
          />

          <div className="absolute bottom-0 top-0 left-1/3 transform -translate-x-1/2 flex items-center space-x-2 ml-2">
            <Logo w={17} h={17} style="" />
            <span className="font-gulim font-bold text-shadow text-custom-white-50 text-nowrap">
              시작
            </span>
          </div>
        </div>
      </div>
      <div className="footer-right flex-shrink-0 border-l border-[#1042af]  shadow-[inset_1px_0_1px_#18bbff] px-2.5 ml-2.5 flex items-center bg-[linear-gradient(to_bottom,#0c59b9_1%,#139ee9_6%,#18b5f2_10%,#139beb_14%,#1290e8_19%,#0d8dea_63%,#0d9ff1_81%,#0f9eed_88%,#119be9_91%,#1392e2_94%,#137ed7_97%,#095bc9_100%)]">
        <span className="text-white text-xs font-light mx-1.25 font-gulim">
          {currentTime}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
