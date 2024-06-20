export type UserInfo = {
  id: number;
  username: number;
  email: number;
};

export type Genre = {
  id: number;
  uuid: string;
  genre_name: string;
  genre_desc: string;
  bg_image: string;
};

export type GenreDetails = {
  podcasts: Podcast[];
} & Genre;

export type Podcast = {
  id: number;
  uuid: string;
  owner_id: string;
  podcast_name: string;
  podcast_desc: string;
  thumbnail_url: string;
  created_at: string;
};

export type PodcastDetails = {
  id: number;
  uuid: string;
  owner_id: string;
  podcast_name: string;
  podcast_desc: string;
  thumbnail_url: string;
  episodes: PodcastEpisode[];
  created_at: string;
};

export type PodcastEpisode = {
  id: number;
  uuid: string;
  podcast_id: number;
  episode_name: string;
  episode_no: number;
  episode_desc: string;
  source_url: string;
  created_at: string;
};

export type PodcastEpisodeDetails = {
  podcast: Podcast;
} & PodcastEpisode;

export type SearchResult = {
  podcasts: Podcast[] | null;
  episodes: PodcastEpisodeDetails[] | null;
  genres: Genre[] | null;
};

export type Post = {
  id: number;
  user_id: number;
  username: string;
  slug: string;
  title: string;
  short_content: string;
  thumbnail_url: string;
  editor_type: number;
  created_at: string;
};

export type PostDetails = {
  id: number;
  user_id: number;
  slug: string;
  title: string;
  content: string;
  topics: Topic[] | null;
  thumbnail_url: string | null;
  editor_type: number;
  created_at: string;
};

export type Topic = {
  id: number;
  slug: string;
  topic_name: string;
  total_posts: number;
  created_at: string;
};

export type PostLike = {
  id: number;
  post_id: number;
  user_id: number;
  created_at: string;
};

export type LoginSuccessResponse = UserInfo;

export type GetAllGenresSuccessResponse = {
  genres: Genre[];
};

export type GetAllPodcastsSuccessResponse = {
  podcasts: Podcast[];
};

export type GetPodcastDetailsSuccessResponse = {
  podcast_details: PodcastDetails;
};

export type GetGenreDetailsSuccessResponse = {
  genre_details: GenreDetails;
};

export type GetEpisodeDetailsSuccessResponse = {
  episode_details: PodcastEpisodeDetails;
};

export type SearchItemsSuccessResponse = {
  result: SearchResult;
};

export type GetRelativeEpisodesSuccessResponse = {
  episodes: PodcastEpisodeDetails[] | null;
};

export type ModifyUserFavouriteSuccessResponse = {
  type: "Episode" | "Podcast";
  item_id: number;
  operator: "Add" | "Remove";
};

export type UserFavouriteItems = {
  favourite_episodes: PodcastEpisode[] | null;
  favourite_podcasts: Podcast[] | null;
};

export type GetHomeFeedsSuccessResponse = {
  podcasts: PodcastDetails[] | null;
  episodes: PodcastEpisodeDetails[] | null;
};

export type CreatePostSuccessResponse = {
  message: string;
};

export type UploadFileSuccessResponse = {
  message: string;
  url: string;
  width: number;
  height: number;
};

export type Comment = {
  id: number;
  post_id: number;
  reply_to_comment_id: number;
  content: string;
  user_details: UserInfo;
  user_id: number;
  created_at: string;
};

export type GetPostDetailsSuccessResponse = {
  post: PostDetails;
  relative_posts: Post[];
};

export type GetPostsSuccessResponse = {
  posts: Post[] | null;
  has_next: boolean;
  has_prev: boolean;
  total?: number;
  total_pages?: number;
};

export type GetTopicsSuccessResponse = {
  topics: Topic[];
};

export type GetPostLikesByPostIdSuccessResponse = {
  post_likes: PostLike[] | null;
};

export type GetCommentsByPostIdSuccessResponse = {
  comments: Comment[] | null;
};
