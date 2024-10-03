import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

function MainSwiper() {
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
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
        <Image
          src={'/swiper/swiper3.svg'}
          alt="swiper"
          width={1000}
          height={200}
          className="w-[720px] h-[280px]"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={'/swiper/swiper4.svg'}
          alt="swiper"
          width={1000}
          height={200}
          className="w-[720px] h-[280px]"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default MainSwiper;
