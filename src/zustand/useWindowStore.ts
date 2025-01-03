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

  addWindow: (newWindow) =>
    set((state) => {
      const id = Date.now().toString();
      const windowCount = Object.keys(state.windows).length;

      // 각 창의 위치를 오른쪽으로 조금씩 이동
      const position = {
        x: 200 + windowCount * 30, // 30px씩 우측으로
        y: 100, // y축은 고정
      };

      // 최대 zIndex 계산
      const maxZIndex = Math.max(
        ...Object.values(state.windows).map((w) => w.zIndex || 0),
        0
      );

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...newWindow,
            id,
            position,
            isFocused: true,
            zIndex: maxZIndex + 1,
          },
        },
      };
    }),

  focusWindow: (id: string) =>
    set((state) => {
      const maxZIndex = Math.max(
        ...Object.values(state.windows).map((w) => w.zIndex || 0),
        0
      );

      return {
        windows: Object.fromEntries(
          Object.entries(state.windows).map(([windowId, window]) => [
            windowId,
            {
              ...window,
              isFocused: windowId === id,
              zIndex: windowId === id ? maxZIndex + 1 : window.zIndex,
            },
          ])
        ),
      };
    }),

  deleteWindow: (id: string) =>
    set((state) => ({
      windows: Object.fromEntries(
        Object.entries(state.windows).filter(([windowId]) => windowId !== id)
      ),
    })),
}));

export default useWindowStore;
