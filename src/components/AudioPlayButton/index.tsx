"use client";

import {
  pauseAudio,
  playAudio,
  setPlaylist,
  setSingleTrack,
} from "@/redux/slices/audioPlayerSlice";
import { State } from "@/redux/store";
import {
  PodcastDetails,
  PodcastEpisode,
  PodcastEpisodeDetails,
} from "@/types/apiResponse";
import { useDispatch, useSelector } from "react-redux";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { twMerge } from "tailwind-merge";
import Lottie from "react-lottie";
import * as animationData from "@/lotties/spectrum-blue-lottie.json";
import { useState } from "react";

type Props = {
  episode:
    | {
        mode: "PLAYLIST";
        details: PodcastEpisode;
      }
    | {
        mode: "SINGLE";
        details: PodcastEpisodeDetails;
      };
  podcastDetails?: PodcastDetails;
};

const AudioPlayButton: React.FC<Props> = ({
  episode,
  podcastDetails = null,
}) => {
  const audioPlayerSlice = useSelector((state: State) => state.audioPlayer);
  const [isHover, setHover] = useState(false);
  const dispatch = useDispatch();
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (episode.mode === "PLAYLIST") {
      if (!podcastDetails || !episode) return;
      if (audioPlayerSlice.mode === "PLAYLIST") {
        if (
          audioPlayerSlice.playList?.currentPodcast?.episodes.find(
            (ele) =>
              ele.episode_no === audioPlayerSlice.playList?.currentEpisodeNo
          )?.uuid === episode.details.uuid
        ) {
          handlePlayerState();
        } else {
          dispatch(
            setPlaylist({
              episodeNo: episode.details.episode_no,
              podcastDetails,
            })
          );
          dispatch(playAudio());
        }
      } else {
        if (audioPlayerSlice.single?.uuid === episode.details.uuid) {
          handlePlayerState();
        } else {
          dispatch(
            setPlaylist({
              episodeNo: episode.details.episode_no,
              podcastDetails,
            })
          );
          dispatch(playAudio());
        }
      }
    } else {
      if (!episode) return;
      if (audioPlayerSlice.mode === "SINGLE") {
        if (audioPlayerSlice.single?.uuid === episode.details.uuid) {
          handlePlayerState();
        } else {
          dispatch(setSingleTrack(episode.details));
          dispatch(playAudio());
        }
      } else {
        if (
          audioPlayerSlice.playList?.currentPodcast?.episodes.find(
            (ele) =>
              ele.episode_no === audioPlayerSlice.playList?.currentEpisodeNo
          )?.uuid === episode.details.uuid
        ) {
          handlePlayerState();
        } else {
          dispatch(setSingleTrack(episode.details));
          dispatch(playAudio());
        }
      }
    }
  };

  const handlePlayerState = () => {
    switch (audioPlayerSlice.playerState) {
      case "PLAYING":
        dispatch(pauseAudio());
        break;
      case "PAUSED":
        dispatch(playAudio());
        break;
      case "STOP":
        dispatch(playAudio());
        break;
    }
  };

  const isEpisodePlaying = (): boolean => {
    if (audioPlayerSlice.mode === "PLAYLIST") {
      if (
        audioPlayerSlice.playList?.currentPodcast?.episodes.find(
          (ele) =>
            ele.episode_no === audioPlayerSlice.playList?.currentEpisodeNo
        )?.uuid === episode.details.uuid &&
        audioPlayerSlice.playerState === "PLAYING"
      ) {
        return true;
      } else {
        false;
      }
    } else {
      if (
        audioPlayerSlice.single?.uuid === episode.details.uuid &&
        audioPlayerSlice.playerState === "PLAYING"
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      className={twMerge(
        "rounded-full",
        "w-[45px]",
        "h-[45px]",
        "bg-[rgba(0,0,0,0.8)]",
        "flex",
        "items-center",
        "justify-center",
        "cursor-pointer",
        "transition-all",
        "hover:scale-110"
      )}
    >
      {isEpisodePlaying() ? (
        !isHover ? (
          <Lottie
            style={{ position: "absolute" }}
            options={lottieOptions}
            height={27}
            width={55}
            isStopped={false}
            isPaused={false}
          />
        ) : (
          <PauseIcon htmlColor="white" />
        )
      ) : (
        <PlayArrowIcon htmlColor="white" />
      )}
    </button>
  );
};

export default AudioPlayButton;
