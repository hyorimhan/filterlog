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
        <Link
          href={
            'https://filterlog.kro.kr/official/80981d98-501e-4599-94d6-94a6102308d2'
          }
        >
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
        <Link
          href={
            'https://filterlog.kro.kr/official/a805873e-d3d3-43b6-a89b-608719f8f797'
          }
        >
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
