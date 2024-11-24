export const blogNameValidate = () => ({
  required: '블로그 이름을 입력해주세요',
  minLength: {
    value: 2,
    message: '블로그 이름은 최소 2자 이상입니다',
  },
  maxLength: {
    value: 30,
    message: '블로그 이름은 30자 이상 입력할 수 없습니다',
  },
});

export const blogDescriptionValidate = () => ({
  required: '블로그 설명을 입력해주세요',
  minLength: {
    value: 2,
    message: '블로그 설명은 최소 2자 이상입니다',
  },
  maxLength: {
    value: 50,
    message: '블로그 설명은 50자 이상 입력할 수 없습니다',
  },
});
