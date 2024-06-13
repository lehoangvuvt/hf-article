import PodcastsService from "@/services/podcasts.service";
import PodcastDetailsView from "./view";

const PodcastDetailsPage = async ({ params }: { params: { uuid: string } }) => {
  const response = await PodcastsService.GetPodcastDetails(params.uuid);
  if (response.status === "fail") return <h1>Not found...</h1>;
  const details = response.data.podcast_details;
  return <PodcastDetailsView details={details} key={details.id} />;
};

export default PodcastDetailsPage;
