'use client';
import { detailOfficialPost } from '@/service/post';
import { blogParams } from '@/types/userBlog';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import Loading from '../common/Loading';

function Detail({ params }: blogParams) {
  const { data: detailPost, isLoading } = useQuery({
    queryKey: ['detailPost'],
    queryFn: () => detailOfficialPost({ post_id: params.id }),
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
          className="font-galmuri text-sm "
        >
          {detailPost.title}
        </button>
      </menu>

      <article role="tabpanel" id="tab-A">
        <p className="flex flex-col items-center justify-center">
          {detailPost.img_url &&
            JSON.parse(detailPost.img_url).map((img: string, index: string) => (
              <Image
                src={img}
                alt="magazineImg"
                key={index}
                width={500}
                height={500}
                unoptimized
                className="flex flex-col items-center justify-center"
              />
            ))}
        </p>

        <div
          className="flex flex-col items-center my-2 text-sm justify-center"
          dangerouslySetInnerHTML={{
            __html: detailPost.description.replace(/<p>><\/p>/g, ''),
          }}
        ></div>
      </article>
    </section>
  );
}

export default Detail;
