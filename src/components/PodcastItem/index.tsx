"use client";

import { routes } from "@/config/routes";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Podcast } from "@/types/apiResponse";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  podcast: Podcast;
  width?: string;
};

const PodcastItem: React.FC<Props> = ({ podcast, width = "20%" }) => {
  const { pushRouteWithHistory } = useCustomRouter();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`${routes.PODCASTS}/${podcast.uuid}`);
  }, [podcast, router]);

  return (
    <div
      onClick={() => pushRouteWithHistory(`${routes.PODCASTS}/${podcast.uuid}`)}
      style={{
        width: width,
        display: "flex",
        flexFlow: "column wrap",
      }}
      className={twMerge(
        "rounded-sm",
        "cursor-pointer",
        "transition-all",
        "hover:brightness-90",
        "p-[10px]"
      )}
    >
      <div
        className={twMerge(
          "aspect-square",
          "font-bold",
          "text-[20px]",
          "relative",
          "w-full"
        )}
      >
        <Image
          src={podcast.thumbnail_url}
          alt={podcast.uuid + "_thumbnail"}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="w-full flex flex-col px-[5px] py-[10px]">
        <div className="w-full text-[#121212] text-[0.95rem] font-semibold">
          {podcast.podcast_name}
        </div>
      </div>
    </div>
  );
};

export default PodcastItem;
