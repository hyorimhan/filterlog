import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const response = request.json();
  const { title, content, nickname, blog_name, blog_id } = response;
}
