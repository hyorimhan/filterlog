import { create } from 'zustand';

export type windowType = {
  id: string;
  title: string;
  initialPath?: string;
  width: number;
  height: number;
  position: { x: number; y: number };
  isFocused?: boolean;
  zIndex: number;
};

type windowStore = {
  windows: Record<string, windowType>;
  addWindow: (window: Omit<windowType, 'id' | 'isFocused'>) => void;
  focusWindow: (id: string) => void;
  deleteWindow: (id: string) => void;
};

const useWindowStore = create<windowStore>((set) => ({
  windows: {},

  // 창 추가 함수
  addWindow: (newWindow) =>
    set((state) => {
      const id = Date.now().toString(); // 고유한 id 생성
      const offset = Object.keys(state.windows).length * 30; // 창이 겹치지 않게 위치 조정

      // 창 추가
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...newWindow,
            id,
            position: { x: offset, y: offset },
            isFocused: true,
            zIndex: 10,
          },
        },
      };
    }),

  // 창을 클릭했을 때 맨 앞으로 가져오는 함수
  focusWindow: (id: string) =>
    set((state) => {
      const maxZIndex = Math.max(
        ...Object.values(state.windows).map((w) => w.zIndex),
        0
      ); // 가장 큰 zIndex 찾기

      // 창의 상태 업데이트: 클릭된 창만 포커스와 zIndex 업데이트
      const updatedWindows = {
        ...state.windows,
        [id]: { ...state.windows[id], isFocused: true, zIndex: maxZIndex + 1 },
      };

      return { windows: updatedWindows };
    }),

  deleteWindow: (id: string) =>
    set((state) => {
      const newWindow = { ...state.windows };
      delete newWindow[id];
      return { windows: newWindow };
    }),
}));

export default useWindowStore;
