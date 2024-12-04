import React from 'react';
import toast from 'react-hot-toast';

function FilterLog() {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } flex items-center justify-center  mt-[10%] bg-opacity-50`}
      >
        <div className="bg-white mt-[5%] max-w-3xl w-full shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5">
          <div className="p-6">
            <p className="text-lg font-medium text-gray-900">사이트 소개</p>
            <div className="mt-4 text-sm text-gray-500 h-80 overflow-y-auto space-y-3">
              <p>
                필터로그(FilterLog)는 2000년대 윈도우 XP 시절의 향수를
                불러일으키는 레트로 감성의 블로그 플랫폼입니다.
              </p>
              <p>
                {' '}
                이곳에서는 여러분의 일상적인 경험부터 특별한 순간들, 그리고 그때
                느낀 감정들을 자유롭게 기록할 수 있어요.{' '}
              </p>
              <p>
                {' '}
                마치 그 시절 우리가 윈도우 메모장을 켜고 일기를 쓰던 것처럼요.
              </p>
              <p>
                다만 좀 더 체계적으로 감정과 경험을 분류하고 정리할 수 있죠.{' '}
              </p>
              <p>
                옛날 싸이월드나 네이버 블로그처럼 다른 사람들의 이야기도
                구경하고 소통할 수 있어요.
              </p>
              <p>
                {' '}
                누군가의 글에 공감이 된다면 따뜻한 댓글을 남길 수도 있고요.
              </p>
              <p>
                {' '}
                2000년대 인터넷 감성을 그대로 담아낸 이 공간에서 우리는 각자의
                이야기를 기록하고, 서로의 마음을 나누며, 잠시 추억 속으로
                돌아가볼 수 있답니다.
              </p>
              <p>
                {' '}
                그 시절 우리가 컴퓨터 앞에 앉아 서로의 미니홈피를 방문하고
                방명록을 남기던 것처럼요.
              </p>
              <p>
                {' '}
                어떠신가요? 지금 시대의 SNS와는 또 다른 매력이 있지 않나요?
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
export default FilterLog;
