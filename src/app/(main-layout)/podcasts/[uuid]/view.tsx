/* eslint-disable @next/next/no-img-element */
"use client";

import EpisodeItem from "@/components/EpisodeItem";
import { PodcastDetails } from "@/types/apiResponse";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";

type Props = {
  details: PodcastDetails;
};

const PodcastDetailsView: React.FC<Props> = ({ details }) => {
  const thumbnailImgRef = useRef<HTMLImageElement>(null);
  const [dominantColor, setDominantColor] = useState("#111111");

  useEffect(() => {
    if (!thumbnailImgRef || !thumbnailImgRef.current) return;
    const getColor = async () => {
      if (!thumbnailImgRef || !thumbnailImgRef.current) return;
      const fac = new FastAverageColor();
      try {
        const color = await fac.getColorAsync(thumbnailImgRef.current);
        setDominantColor(color.hex);
      } catch (error) {
        console.log(error);
      }
    };
    getColor();
  }, []);

  return (
    <div
      style={{
        marginTop: "-95px",
        zIndex: 99,
        position: "absolute",
      }}
      className="w-full flex flex-col"
    >
      <div
        className="w-full h-[300px] flex flex-row items-center p-[30px] gap-[30px]"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: `linear-gradient(to bottom, ${dominantColor} 10%, black)`,
        }}
      >
        <img
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="h-[85%] aspect-square rounded-[5px] shadow-xl"
          crossOrigin="anonymous"
          ref={thumbnailImgRef}
          src={details.thumbnail_url}
          alt="thumbnail-image"
        />
        <div className="h-full flex-1 flex flex-col justify-center">
          <div className="text-[white] font-bold text-[45px]">
            {details?.podcast_name}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom,${dominantColor}, 0.1%, black)`,
        }}
        className="w-full flex flex-col"
      >
        {details.episodes?.length > 0 &&
          details.episodes.map((ep, _) => (
            <EpisodeItem key={ep.id} episode={ep} podcastDetails={details} />
          ))}
      </div>
    </div>
  );
};

export default PodcastDetailsView;
