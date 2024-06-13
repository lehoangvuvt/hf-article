"use client";

import { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useTopics from "@/react-query/hooks/useTopics";
import { useRouter, useSearchParams } from "next/navigation";

const ScrollerItems = () => {
  const searchParams = useSearchParams();
  const widthPerItem = 100;
  const { topics, isLoading } = useTopics();
  const [isLast, setLast] = useState(false);
  const [isFirst, setFirst] = useState(true);
  const router = useRouter();
  const [currTopic, setCurrTopic] = useState("all");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.has("topic")) {
      setCurrTopic(searchParams.get("topic") as string);
    }
  }, [searchParams]);

  const handleNext = () => {
    setFirst(false);
    if (ref && ref.current) {
      if (
        Math.ceil(ref.current.scrollLeft + ref.current.offsetWidth) >=
        ref.current.scrollWidth
      ) {
        return;
      }

      ref.current.scrollTo({
        left: ref.current.scrollLeft + widthPerItem,
        behavior: "smooth",
      });

      if (
        Math.ceil(ref.current.scrollLeft + ref.current.offsetWidth) >=
        ref.current.scrollWidth - widthPerItem
      ) {
        setLast(true);
      }
    }
  };

  const handlePrev = () => {
    setLast(false);
    if (ref && ref.current) {
      if (ref.current.scrollLeft === 0) return;
      ref.current.scrollTo({
        left: ref.current.scrollLeft - widthPerItem,
        behavior: "smooth",
      });

      if (ref.current.scrollLeft <= widthPerItem) {
        setFirst(true);
      } else {
        setLast(false);
      }
    }
  };

  return (
    <div
      style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
      className="w-full flex flex-row bg-[white] items-center justify-between relative"
    >
      <button
        disabled={isFirst}
        style={{
          opacity: !isFirst ? 1 : 0,
          cursor: !isFirst ? "pointer" : "default",
          zIndex: 11,
        }}
        onClick={handlePrev}
        className="w-[30px]"
      >
        <ArrowForwardIosIcon style={{ transform: "rotate(-180deg)" }} />
      </button>
      {!isFirst && (
        <div
          style={{
            mask: `linear-gradient(-90deg, transparent, white 40%, white 80%, white 80%) 0 100%`,
            maskRepeat: "no-repeat",
            position: "absolute",
            background: "white",
            height: "100%",
            width: widthPerItem + "px",
            left: "-25px",
            opacity: 1,
            zIndex: 10,
            backgroundColor: "white",
            pointerEvents: "none",
          }}
        />
      )}

      {!isLoading && topics && topics.length > 0 && (
        <div
          ref={ref}
          style={{
            mask: isLast
              ? "none"
              : `linear-gradient(-90deg, transparent, white 20%, white 80%, white 80%) 0 100%`,
          }}
          className="flex-1 h-[50px] bg-[white] 
              overflow-y-hidden
              overflow-x-hidden 
              flex flex-col flex-wrap
              "
        >
          <div
            style={{
              minWidth: "10%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginRight: "40px",
              borderBottom:
                currTopic === "all"
                  ? "2px solid #121212"
                  : "2px solid transparent",
              color: currTopic === "all" ? "#121212" : "rgba(0,0,0,0.7)",
            }}
            className="h-[50px] flex 
              items-center justify-center text-[0.85rem] font-medium cursor-pointer 
              hover:text-[rgba(0,0,0,1)]"
            key={-1}
            onClick={() => router.push(`/?topic=all`)}
          >
            All
          </div>
          {topics.map((topic) => (
            <div
              style={{
                minWidth: "10%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginRight: "40px",
                borderBottom:
                  currTopic === topic.slug
                    ? "2px solid #121212"
                    : "2px solid transparent",
                color: currTopic === topic.slug ? "#121212" : "rgba(0,0,0,0.7)",
              }}
              className="h-[50px] flex 
              items-center justify-center text-[0.85rem] text-[rgba(0,0,0,0.7)] font-medium cursor-pointer 
              hover:text-[rgba(0,0,0,1)]"
              key={topic.id}
              onClick={() => router.push(`/?topic=${topic.slug}`)}
            >
              {topic.topic_name}
            </div>
          ))}
        </div>
      )}

      <button
        disabled={isLast}
        style={{
          opacity: !isLast ? 1 : 0,
          cursor: !isLast ? "pointer" : "default",
          zIndex: 11,
        }}
        onClick={handleNext}
        className="w-[30px]"
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default ScrollerItems;
