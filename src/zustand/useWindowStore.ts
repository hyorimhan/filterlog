import { create } from 'zustand';
// import { create } from 'zustand';

type windowType = {
  id: string;
  title: string;
  initialPath: string;
  width: number;
  height: number;
  position: { x: number; y: number };
  isFocused: boolean;
};

type windowStore = {
  windows: Record<string, windowType>;
  addWindow: (window: Omit<windowType, 'id' | 'isFocused'>) => void;
};

const useWindowStore = create<windowStore>((set) => ({
  windows: {},
  addWindow: (newWindow) =>
    set((state) => {
      const existingWindow = Object.values(state.windows).find(
        (window) => window.title === newWindow.title
      );
      if (existingWindow) {
        return {
          window: {
            ...state.windows,
            [existingWindow.id]: { ...existingWindow, isFocused: true },
          },
        };
      }
      const id = Date.now().toString();
      const offset = Object.keys(state.windows).length * 30;
      // const position = {
      //   x: (newWindow.position.x + offset) % (window.innerHeight - 100),
      //   y: (newWindow.position.y + offset) % (window.innerHeight - 100),
      // };
      const position = {
        x: offset,
        y: offset,
      };
      return {
        windows: {
          ...state.windows,
          [id]: { ...newWindow, id, position, isFocused: true },
        },
      };
    }),
  focusWindow: (id: string) =>
    set((state) => ({
      windows: Object.fromEntries(
        Object.entries(state.windows).map(([windowId, window]) => [
          windowId,
          { ...window, isFocused: windowId === id },
        ])
      ),
    })),
}));
export default useWindowStore;
