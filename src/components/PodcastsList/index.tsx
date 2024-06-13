"use client";

import { Podcast } from "@/types/apiResponse";
import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import PodcastItem from "../PodcastItem";
import usePodcasts from "@/react-query/hooks/usePodcasts";

type Props = {
  externalData?: Podcast[] | null;
};

const PodcastsList: React.FC<Props> = ({ externalData = null }) => {
  const { podcasts, isLoading } = usePodcasts(externalData === null);

  return (
    <div className="w-full flex flex-row flex-wrap gap-[15px] px-[15px] pt-[30px]">
      {externalData
        ? externalData.map((podcast) => (
            <PodcastItem width={"20%"} key={podcast.id} podcast={podcast} />
          ))
        : isLoading &&
          Array(10)
            .fill("")
            .map((_, i) => (
              <MySkeleton shape={SHAPE_ENUMS.SQUARE} key={i} width="20%" />
            ))}
      {!isLoading &&
        podcasts &&
        podcasts.length > 0 &&
        podcasts.map((podcast) => (
          <PodcastItem width={"20%"} key={podcast.id} podcast={podcast} />
        ))}
    </div>
  );
};

export default PodcastsList;
