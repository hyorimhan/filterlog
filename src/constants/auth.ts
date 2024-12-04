export const EMAIL_VALIDATION = () => ({
  required: '이메일을 입력해주세요',
});

export const PASSWORD_VALIDATION = () => ({
  required: '비밀번호를 입력해주세요',
  minLength: {
    value: 7,
    message: '비밀번호는 최소 7자 이상 입력해주세요',
  },
  maxLength: {
    value: 17,
    message: '비밀번호는 최대 17자까지 입력 가능합니다',
  },
});

export const PASSWORD_CONFIRM_VALIDATION = (password: string) => ({
  required: '비밀번호 확인을 입력해주세요',
  validate: (value: string) =>
    value === password ? true : '비밀번호가 서로 다릅니다',
});

export const NICKNAME_VALIDATION = () => ({
  required: '닉네임을 입력해주세요',
  minLength: {
    value: 2,
    message: '닉네임은 최소 2자 이상 입력해주세요',
  },
  maxLength: {
    value: 15,
    message: '닉네임은 15자까지 입력 가능합니다',
  },
});
