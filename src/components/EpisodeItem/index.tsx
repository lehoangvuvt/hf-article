"use client";

import { Podcast, PodcastDetails, PodcastEpisode } from "@/types/apiResponse";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useCustomRouter from "@/hooks/useCustomRouter";
import AudioPlayButton from "../AudioPlayButton";
import moment from "moment";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { routes } from "@/config/routes";

type Props = {
  podcastDetails?: PodcastDetails;
  podcast?: Podcast;
  episode: PodcastEpisode;
  mode?: "DEFAULT" | "HOME_FEED_1" | "HOME_FEED_2";
};

const EpisodeItem: React.FC<Props> = ({
  episode,
  podcastDetails = null,
  podcast = null,
  mode = "DEFAULT",
}) => {
  const { pushRouteWithHistory } = useCustomRouter();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`${routes.EPISODES}/${episode.uuid}`);
  }, [episode, router]);

  if (mode !== "DEFAULT") {
    return (
      <div
        onClick={() =>
          pushRouteWithHistory(`${routes.EPISODES}/${episode.uuid}`)
        }
        className={twMerge(
          "w-full",
          "flex flex-col items-end",
          "py-[20px] px-[20px]",
          "cursor-pointer",
          "transition-all",
          "bg-[white]",
          "hover:brightness-90"
        )}
      >
        <div
          style={{
            display: "flex",
            flexFlow: mode === "HOME_FEED_1" ? "column wrap" : "row wrap",
            gap: mode === "HOME_FEED_1" ? "20px" : "10px",
          }}
          className="w-full"
          key={episode.id}
        >
          <div
            style={{
              width: mode === "HOME_FEED_1" ? "100%" : "120px",
              aspectRatio: 1,
            }}
            className="rounded-md relative"
          >
            <Image
              className="rounded-md shadow-lg"
              src={
                podcastDetails
                  ? podcastDetails.thumbnail_url
                  : podcast
                  ? podcast.thumbnail_url
                  : ""
              }
              alt={episode.uuid + "_thumbnail"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div
            style={{
              paddingLeft: mode === "HOME_FEED_1" ? "0px" : "15px",
            }}
            className="flex-1 flex-col"
          >
            <div
              className={twMerge(
                "w-full",
                "text-[#121212]",
                "font-bold",
                "text-[1.1rem]"
              )}
            >
              {episode.episode_name}
            </div>

            <div className="text-[#121212)] text-[0.8rem] font-semibold pt-[10px]">
              {moment(episode.created_at).format("DD/MM/YYYY")}
            </div>
          </div>
        </div>
        {podcastDetails && (
          <div
            className={twMerge(
              "w-[calc(100%-140px)]",
              "h-[40px]",
              "flex flex-row",
              "items-center"
            )}
          >
            <AudioPlayButton
              episode={{ mode: "PLAYLIST", details: episode }}
              podcastDetails={podcastDetails}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => pushRouteWithHistory(`${routes.EPISODES}/${episode.uuid}`)}
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.2)",
      }}
      className={twMerge(
        "w-full",
        "flex flex-col",
        "py-[20px] px-[30px]",
        "cursor-pointer",
        "transition-all",
        "bg-[white]",
        "hover:brightness-90"
      )}
    >
      <div
        className={twMerge("w-full", "flex flex-row gap-[10px]")}
        key={episode.id}
      >
        <div className="h-[120px] w-[120px] rounded-md relative">
          <Image
            src={
              podcastDetails
                ? podcastDetails.thumbnail_url
                : podcast
                ? podcast.thumbnail_url
                : ""
            }
            alt={episode.uuid + "_thumbnail"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="flex-1 flex-col pl-[15px]">
          <div
            className={twMerge(
              "w-full",
              "text-[#121212]",
              "font-bold",
              "text-[1.1rem]"
            )}
          >
            {episode.episode_name}
          </div>

          <div
            className={twMerge(
              "w-full",
              "text-[rgba(0,0,0,0.7)]",
              "font-semibold",
              "text-[0.9rem]",
              "pt-[5px]"
            )}
          >
            <div
              style={{
                width: "80%",
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            >
              {episode.episode_desc}
            </div>
          </div>

          <div className="text-[#121212)] text-[0.8rem] font-semibold pt-[10px]">
            {moment(episode.created_at).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>
      {podcastDetails && (
        <div
          className={twMerge(
            "w-full",
            "h-[80px]",
            "flex flex-row",
            "items-center",
            "justify-end"
          )}
        >
          <AudioPlayButton
            episode={{ mode: "PLAYLIST", details: episode }}
            podcastDetails={podcastDetails}
          />
        </div>
      )}
    </div>
  );
};

export default EpisodeItem;
