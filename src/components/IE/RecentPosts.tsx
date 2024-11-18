import { allPosts } from '@/service/blog';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

function RecentPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: allPosts,
  });
  if (isLoading) {
    return '로딩중';
  }
  return (
    <div>
      {data?.map((post) => (
        <Link
          href={`blog/post/${post.id}`}
          key={post.id}
          className="text-black"
        >
          <div className="border-2 my-2 border-custom-green-300 mx-2">
            <span className="truncate"> {post.title}</span>
            <span> - {post.blog_name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecentPosts;
