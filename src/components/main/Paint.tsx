import Image from 'next/image';

function Paint() {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer">
      <Image src={'/main/Paint.png'} alt="IE" width={40} height={40} />
      <div className="font-tahoma text-xs text-custom-white-50 mt-1 ">
        <p className="text-shadow font-gulim">그림판</p>
      </div>
    </div>
  );
}

export default Paint;
