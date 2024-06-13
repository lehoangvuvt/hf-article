import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../consts";
import { PodcastDetails, PodcastEpisodeDetails } from "@/types/apiResponse";

type State = {
  mode: "PLAYLIST" | "SINGLE";
  playList: {
    currentPodcast: PodcastDetails;
    currentEpisodeNo: number;
  } | null;
  single: PodcastEpisodeDetails | null;
  playerState: "PAUSED" | "PLAYING" | "STOP";
};

const initialState: State = {
  mode: "SINGLE",
  playList: null,
  single: null,
  playerState: "STOP",
};

const audioPlayerSlice = createSlice({
  name: SLICE_NAMES.AUDIO_PLAYER,
  initialState,
  reducers: {
    setPlaylist(
      state,
      action: { payload: { podcastDetails: PodcastDetails; episodeNo: number } }
    ) {
      state.mode = "PLAYLIST";
      state.playList = {
        currentPodcast: action.payload.podcastDetails,
        currentEpisodeNo: action.payload.episodeNo,
      };
    },
    playAudio(state) {
      state.playerState = "PLAYING";
    },
    playPrev(state) {
      if (!state.playList || state.mode === "SINGLE") return;
      if (state.playList.currentPodcast) {
        const firstEpNo = state.playList.currentPodcast.episodes.toSorted(
          (a, b) => {
            return a.episode_no - b.episode_no;
          }
        )[0].episode_no;
        if (state.playList.currentEpisodeNo > firstEpNo) {
          state.playList.currentEpisodeNo -= 1;
          state.playerState = "PLAYING";
        } else {
          state.playerState = "STOP";
        }
      }
    },
    playNext(state) {
      if (!state.playList || state.mode === "SINGLE") return;
      if (state.playList.currentPodcast) {
        const lastEpNo = state.playList.currentPodcast.episodes.toSorted(
          (a, b) => {
            return b.episode_no - a.episode_no;
          }
        )[0].episode_no;
        if (state.playList.currentEpisodeNo < lastEpNo) {
          state.playList.currentEpisodeNo += 1;
          state.playerState = "PLAYING";
        } else {
          state.playerState = "STOP";
        }
      }
    },
    pauseAudio(state) {
      state.playerState = "PAUSED";
    },
    stopAudio(state) {
      state.playerState = "STOP";
    },
    setSingleTrack(state, action: { payload: PodcastEpisodeDetails }) {
      state.mode = "SINGLE";
      state.single = action.payload;
    },
  },
});

export const {
  setPlaylist,
  playAudio,
  pauseAudio,
  stopAudio,
  playNext,
  playPrev,
  setSingleTrack,
} = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
