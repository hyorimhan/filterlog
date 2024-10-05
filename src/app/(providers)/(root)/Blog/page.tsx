import Image from 'next/image';
import React from 'react';
import { existingBlog } from '../../../../service/blog';
import { userInfo } from '@/service/auth';

const BlogPage = async () => {
  const user = await userInfo();
  console.log(user);
  const existing = user ? await existingBlog(user) : null;
  return (
    <div>
      {!existing && (
        <div>
          <Image
            src={'blog/createBlog.svg'}
            alt="createBlog"
            width={1280}
            height={280}
          />
          <form action="">
            <label htmlFor=""></label>
            <input type="text" />
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
