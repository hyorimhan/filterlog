export const blogName = () => ({
  require: '블로그 이름을 입력해주세요',
  minLength: {
    value: 2,
    message: '블로그 이름은 최소 2글자 이상 입력해주세요',
  },
  maxLength: {
    value: 12,
    message: '블로그 이름은 최대 12자까지 입력가능합니다',
  },
});

export const blogDescription = () => ({
  require: '블로그 설명을 입력해주세요',
  minLength: {
    value: 2,
    message: '블로그 설명은 최소 2글자 이상 입력해주세요',
  },
  maxLength: {
    value: 50,
    message: '블로그 설명은 최대 50자까지 입력가능합니다',
  },
});
