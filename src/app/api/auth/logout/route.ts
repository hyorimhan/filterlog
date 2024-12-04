import { createClient } from '@/supabase/server';
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from '@/utils/error/api';

export async function DELETE() {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      handleError('로그아웃에 실패했습니다');
    } else {
      handleSuccess('로그아웃 되었습니다');
    }
  } catch {
    handleNetworkError();
  }
}
