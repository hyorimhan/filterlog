import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
function Ad() {
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      <SwiperSlide>
        <Image src={'/ad/adSwiper3.svg'} alt="ad" width={280} height={280} />
      </SwiperSlide>
      {/* <SwiperSlide>
        <Image src={'/ad/adSwiper2.svg'} alt="ad" width={275} height={280} />
      </SwiperSlide> */}
      {/* <SwiperSlide>
        <Image src={'/ad/adSwiper3.svg'} alt="ad" width={275} height={280} />
      </SwiperSlide> */}
    </Swiper>
  );
}

export default Ad;
