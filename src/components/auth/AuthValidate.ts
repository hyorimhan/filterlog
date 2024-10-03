export const emailValidate = () => ({
  required: '이메일을 입력해주세요',
});

export const passwordValidate = () => ({
  required: '비밀번호를 입력해주세요',
  minLength: {
    value: 6,
    message: '비밀번호는 최소 6자 이상입니다',
  },
  maxLength: {
    value: 15,
    message: '비밀번호는 15자 이상 입력할 수 없습니다',
  },
});

export const passwordConfirmValidate = (password: string) => ({
  required: '비밀번호 확인을 입력해주세요',
  validate: (value: string) =>
    value === password ? true : '비밀번호가 동일하지 않습니다',
});

export const nicknameValidate = () => ({
  required: '닉네임을 입력해주세요',
  minLength: {
    value: 2,
    message: '닉네임은 최소 2자 이상입니다',
  },
  maxLength: {
    value: 10,
    message: '닉네임은 10자 이상 입력할 수 없습니다',
  },
});
