import React from 'react';
import toast from 'react-hot-toast';

export function privacyPolicy() {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } flex items-center justify-center  mt-[10%] bg-opacity-50`}
      >
        <div className="bg-white mt-[5%] max-w-3xl w-full shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5">
          <div className="p-6">
            <p className="text-lg font-medium text-gray-900">
              개인정보 처리방침
            </p>
            <div className="mt-4 text-sm text-gray-500 h-80 overflow-y-auto">
              개인정보 처리방침 [FilterLog]](이하 &quot;필터로그&quot;)는
              사용자의 개인정보 보호를 중요하게 생각합니다. 본 방침은 사용자의
              개인정보를 어떻게 수집하고, 이용하며, 보호하는지에 대한 내용을
              담고 있습니다.
              <p>
                1. 수집하는 개인정보 회원가입 시: 이메일 주소, 닉네임, 비밀번호
                | 게시글 작성 시: 닉네임, 이메일, 콘텐츠(제목, 본문 등) | 자동
                수집 정보: IP 주소, 브라우저 종류, 방문 페이지 등
              </p>
              <p>
                2. 개인정보 이용 목적 서비스 제공 및 운영 사용자 인증 및 로그인
                관리 서비스 개선 및 통계 분석
              </p>
              <p>
                3. 개인정보 제공 사용자의 동의 없이 제3자에게 개인정보를
                제공하지 않습니다. 단, 법적 요구가 있을 경우 예외가 있을 수
                있습니다.
              </p>
              <p>
                4. 개인정보 열람 및 수정 사용자는 언제든지 개인정보를 열람하고
                수정할 수 있으며, 삭제를 원할 경우 문의를 통해 요청할 수
                있습니다.
              </p>
              <p>
                5. 개인정보 처리방침 변경 본 방침은 변경될 수 있으며, 변경 시
                공지사항을 통해 안내합니다.
              </p>
            </div>
          </div>
          <button
            onClick={() => toast.remove(t.id)}
            className="border-t border-gray-200 p-4 flex items-center justify-center text-sm font-medium text-indigo-600 "
          >
            닫기
          </button>
        </div>
      </div>
    ),
    { duration: Infinity }
  );
}
