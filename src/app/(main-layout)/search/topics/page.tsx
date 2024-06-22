"use client";

import TopicsList from "@/components/TopicsList";
import useSearchTopics from "@/react-query/hooks/useSearchTopics";

const SearchTopicsPage = ({
  searchParams,
}: {
  searchParams: { q?: string };
}) => {
  const { topics, isLoading: isLoadingTopics } = useSearchTopics(
    searchParams.q ?? "",
    true
  );

  return <TopicsList isLoading={isLoadingTopics} topics={topics} />;
};

export default SearchTopicsPage;
