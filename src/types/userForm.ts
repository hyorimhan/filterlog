import { User } from '@supabase/supabase-js';
import { Database } from './supabase';

export type signUpType = {
  email: string | null;
  password: string;
  passwordConfirm: string;
  nickname: string | null;
};

export type userInfoType = {
  user: User | null;
  nickname: string | null;
  saveUser: (info: User | null) => void;
  saveNickname: (nick: string | null) => void;
};

export type loginType = Omit<signUpType, 'passwordConfirm' | 'nickname'>;

export type profileType = Omit<
  signUpType,
  'passwordConfirm' | 'password'
> | null;

export type userType = Database['public']['Tables']['users']['Row'];
