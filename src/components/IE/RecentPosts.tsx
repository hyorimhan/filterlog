import { allPosts } from '@/service/post';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import Loading from '../common/Loading';

function RecentPosts() {
  const { data: recentPost, isLoading } = useQuery({
    queryKey: ['recentPost'],
    queryFn: allPosts,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {recentPost?.map((post) => (
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
