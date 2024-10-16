// import { totalMyEmotion } from '@/service/blog';
// import { useQuery } from '@tanstack/react-query';
// import React from 'react';

// function TotalEmotion({ user_id }: { user_id: string }) {
//   const { data: total, isLoading } = useQuery({
//     queryKey: ['total', user_id],
//     queryFn: () => totalMyEmotion({ user_id }),
//     enabled: !!user_id,
//   });

//   if (isLoading) {
//     return '로딩중';
//   }
//   console.log(total);
//   return <div>{JSON.stringify(total)}</div>;
// }

// export default TotalEmotion;
