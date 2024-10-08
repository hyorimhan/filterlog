// import { createClient } from '@/supabase/server';
// import { NextRequest, NextResponse } from 'next/server';

// export const POST = async (request: NextRequest) => {
//   const supabase = createClient();
//   try{
//     const response = await request.json();
//     const { todayEmotion, user_id,  } = response;
//     const { data: emotionData, error } = await supabase
//       .from('emotion')
//       .insert(todayEmotion);

//       if(error){
//         NextResponse.json({message: error.message})
//       }
//   }

// };
