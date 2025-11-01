import { create } from "zustand";

interface WebcamStore {
  stream: MediaStream | null;
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
  startWebcam: () => Promise<void>;
  stopWebcam: () => void;
  setStream: (stream: MediaStream | null) => void;
}

export const useWebcamStore = create<WebcamStore>((set, get) => ({
  stream: null,
  isActive: false,
  isLoading: false,
  error: null,

  startWebcam: async () => {
    const { isActive } = get();
    if (isActive) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      set({
        stream,
        isActive: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = "웹캠 접근 실패. 권한을 확인해주세요.";
      set({
        error: message,
        isLoading: false,
        isActive: false,
        stream: null,
      });
    }
  },

  stopWebcam: () => {
    const { stream } = get();

    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      set({
        stream: null,
        isActive: false,
        error: null,
      });
    }
  },

  setStream: (stream) => set({ stream }),
}));
