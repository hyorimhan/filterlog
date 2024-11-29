'use client';
import { blogParams } from '@/types/userBlog';
import Image from 'next/image';
import React from 'react';
import Loading from '../common/Loading';
import { UsePostQuery } from '@/hooks/user/UseProfileQuery';

function Detail({ params }: Readonly<blogParams>) {
  // const { data: detailPost, isLoading } = useQuery({
  //   queryKey: ['detailPost', params.id],
  //   queryFn: () => detailOfficialPosts({ post_id: params.id }),
  // });
  const { detailOfficialPost, isLoading } = UsePostQuery({
    post_id: params.id,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="tabs m-2" style={{ maxWidth: '1280px' }}>
      <menu role="tablist" aria-label="Sample Tabs">
        <button
          role="tab"
          aria-selected="true"
          aria-controls="tab-A"
          className="text-sm "
        >
          {detailOfficialPost.title}
        </button>
      </menu>

      <article role="tabpanel" id="tab-A">
        <p className="flex flex-col items-center justify-center">
          {detailOfficialPost.img_url &&
            JSON.parse(detailOfficialPost.img_url).map(
              (img: string, index: string) => (
                <Image
                  src={img}
                  alt="magazineImg"
                  key={index}
                  width={500}
                  height={500}
                  unoptimized
                  className="flex flex-col items-center justify-center"
                />
              )
            )}
        </p>

        <div
          className="flex flex-col items-center my-2 text-sm justify-center"
          dangerouslySetInnerHTML={{
            __html: detailOfficialPost.description.replace(/<p>><\/p>/g, ''),
          }}
        ></div>
      </article>
    </section>
  );
}

export default Detail;
