import { User } from '@supabase/supabase-js';

export type signUpType = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export type userInfoType = {
  user: User | null;
  saveUser: (info: User | null) => void;
};

export type loginType = Omit<signUpType, 'passwordConfirm' | 'nickname'>;
