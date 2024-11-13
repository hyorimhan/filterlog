import React from 'react';
import toast from 'react-hot-toast';

function Support() {
  const openMail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=hyol120@zohomail.com&subject=문의하기&body=문의 내용을 입력해주세요`
    );
  };
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } flex items-center justify-center  mt-[10%] bg-opacity-50`}
      >
        <div className="bg-white mt-[5%] max-w-3xl w-full shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5">
          <div className="p-6">
            <p className="text-lg font-medium text-gray-900">문의</p>
            <div className="mt-4 text-sm text-gray-500 h-80 overflow-y-auto">
              <p>
                아래 문의하기를 클릭해 문의 내용을 작성해 주세요.
                <p
                  onClick={openMail}
                  className=" bg-custom-green-600 text-sm py-2 hover:bg-custom-green-400 text-white w-16 text-center mt-5 mx-auto shadow-sm cursor-pointer"
                >
                  문의하기
                </p>
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
export default Support;
