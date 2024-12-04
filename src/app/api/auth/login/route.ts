import { createClient } from '@/supabase/server';
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from '@/utils/error/api';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { email, password } = await request.json();
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return handleError(error?.message);

    if (user) return handleSuccess('로그인 되었습니다', user);
  } catch {
    handleNetworkError();
  }
}
