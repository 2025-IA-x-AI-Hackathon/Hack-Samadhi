import { create } from "zustand";

interface VideoStoreState {
  source: MediaStream | string | null;
  sourceType: "url" | "stream" | "none";
  videoName: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  error: string | null;
}

interface VideoStoreActions {
  setVideo: (path: string, name: string) => void;
  startScreenShare: () => Promise<void>;
  stopVideoSource: () => void;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

const stopActiveStream = (
  source: MediaStream | string | null,
  sourceType: "url" | "stream" | "none"
) => {
  if (sourceType === "stream" && source) {
    (source as MediaStream).getTracks().forEach((track) => {
      track.stop();
    });
  }
};

const initialState: VideoStoreState = {
  source: null,
  sourceType: "none",
  videoName: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  isLoading: false,
  error: null,
};

export const useVideoStore = create<VideoStoreState & VideoStoreActions>(
  (set, get) => ({
    ...initialState,

    setVideo: (path, name) => {
      const { source, sourceType } = get();
      stopActiveStream(source, sourceType);

      set({
        source: path,
        sourceType: "url",
        videoName: name,
        isPlaying: false,
        currentTime: 0,
        isLoading: false,
        error: null,
      });
    },

    startScreenShare: async () => {
      if (get().isLoading) return;

      set({ isLoading: true, error: null });

      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });

        const { source, sourceType } = get();
        stopActiveStream(source, sourceType);

        stream.getVideoTracks()[0].onended = () => {
          get().stopVideoSource();
        };

        set({
          source: stream,
          sourceType: "stream",
          videoName: "화면 공유",
          isPlaying: true,
          currentTime: 0,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        set({
          error: "화면 공유 시작 실패. 권한을 확인해주세요.",
          isLoading: false,
          source: null,
          sourceType: "none",
          videoName: null,
          isPlaying: false,
        });
      }
    },

    stopVideoSource: () => {
      const { source, sourceType } = get();
      stopActiveStream(source, sourceType);
      set({ ...initialState });
    },

    setPlaying: (playing) => set({ isPlaying: playing }),
    setCurrentTime: (time) => set({ currentTime: time }),
    setDuration: (duration) => set({ duration: duration }),
  })
);
