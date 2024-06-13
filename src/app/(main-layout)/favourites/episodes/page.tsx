"use client";

import withAuth from "@/HOC/withAuth";
import { routes } from "@/config/routes";
import useCustomRouter from "@/hooks/useCustomRouter";
import { State } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const FavouritesEpisodes = () => {
  const userSlice = useSelector((state: State) => state.user);
  const headerColor = "#FF80AB";
  const { pushRouteWithHistory } = useCustomRouter();
  const router = useRouter();

  useEffect(() => {
    if (
      userSlice.favouriteItems &&
      userSlice.favouriteItems.favourite_episodes &&
      userSlice.favouriteItems.favourite_episodes.length > 0
    ) {
      userSlice.favouriteItems.favourite_episodes.forEach((ep) => {
        router.prefetch(`${routes.EPISODES}/${ep.uuid}`);
      });
    }
  }, [userSlice, router]);

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
        className="w-full h-[250px] flex flex-row items-center p-[30px] gap-[30px]"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: `linear-gradient(to bottom, ${headerColor} 10%, black)`,
        }}
      >
        <div
          className={twMerge(
            "text-[white] font-extrabold text-[4em] px-[20px]"
          )}
        >
          Favourite Episodes
        </div>
      </div>
      <div className="w-full flex flex-col px-[5px] py-[5px]">
        {userSlice &&
          userSlice.favouriteItems &&
          userSlice.favouriteItems.favourite_episodes &&
          userSlice.favouriteItems.favourite_episodes.length > 0 &&
          userSlice.favouriteItems.favourite_episodes.map((episode, i) => (
            <div
              onClick={() =>
                pushRouteWithHistory(`${routes.EPISODES}/${episode.uuid}`)
              }
              className="w-full flex flex-row py-[18px] px-[30px] 
              cursor-pointer items-center font-medium text-[14px] 
              hover:bg-[rgba(0,0,0,0.06)]
              transition-all
              rounded-sm
              "
              key={episode.id}
            >
              <div className="text-[rgba(0,0,0,0.5)] w-[40px]">{i + 1}</div>
              <div className="text-[#121212] flex-1">
                {episode.episode_name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default withAuth(FavouritesEpisodes);
