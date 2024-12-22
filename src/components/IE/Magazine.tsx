import { useCategoryPost } from '@/hooks/blog/usePostQuery';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../common/Loading';
import { memo } from 'react';

function Magazine() {
  const category = 'magazine';

  const { showOfficialPost, categoryLoading } = useCategoryPost(category);

  if (categoryLoading) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-2  ">
      <div className=" space-y-3 w-full mb-1 ">
        <p className="mt-5 text-center text-[16px] font-bold">
          Filter Magazine
        </p>
        {showOfficialPost?.slice(0, 5).map((post) => (
          <div
            key={post.id}
            className="border-[3px] border-custom-green-600 p-2 rounded-lg mx-1 mt-2"
          >
            <Link
              href={`official/${post.id}`}
              className="focus:outline-none text-black"
            >
              <div className="text-sm font-semibold  ">💌 {post.title}</div>
              <div className="space-y-2 mt-2">
                <p className="indent-7 truncate">
                  {post.description?.replace(/<\/?[^>]+(>|$)/g, '')}
                </p>
              </div>
            </Link>
          </div>
        ))}
        <Link
          href={'/official?tab=tab-A&category=magazine'}
          className="flex justify-center focus:outline-none text-black"
        >
          more+
        </Link>
      </div>

      <Link
        href={'/official?tab=tab-A&category=magazine'}
        className="flex justify-center focus:outline-none text-black"
      >
        <Image
          src={'/magazine4.svg'}
          alt="magazine"
          width={500}
          height={500}
          className=" h-full flex items-center"
        />
      </Link>
    </div>
  );
}

export default memo(Magazine);
