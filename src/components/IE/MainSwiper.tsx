import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';

function MainSwiper() {
  return (
    <Swiper
      loop={true}
      pagination={{
        clickable: true,
        type: 'bullets',
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
    >
      <SwiperSlide>
        <Link href={'https://t2m.kr/ohhmE'}>
          <Image
            src={'/swiper/swiper2.svg'}
            alt="swiper"
            width={1000}
            height={200}
            className="w-[720px] h-[280px]"
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'https://t2m.kr/fpLNn'}>
          <Image
            src={'/swiper/swiper1.svg'}
            alt="swiper"
            width={1000}
            height={200}
            className="w-[720px] h-[280px]"
          />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}

export default MainSwiper;
