// export type Tweet = {
//   created_at: string;
//   id: number;
//   id_str: string;
//   text: string;
//   display_text_range?: [number, number];
//   source: string;
//   truncated: boolean;
//   in_reply_to_status_id: null;
//   in_reply_to_status_id_str: null;
//   in_reply_to_user_id: null;
//   in_reply_to_user_id_str: null;
//   in_reply_to_screen_name: null;
//   user: {
//     id: number;
//     id_str: string;
//     name: string;
//     screen_name: string;
//     location: string;
//     url: null;
//     description: string;
//     translator_type: string;
//     protected: boolean;
//     verified: boolean;
//     followers_count: number;
//     friends_count: number;
//     listed_count: number;
//     favourites_count: number;
//     statuses_count: number;
//     created_at: string;
//     utc_offset: null;
//     time_zone: null;
//     geo_enabled: boolean;
//     lang: null;
//     contributors_enabled: boolean;
//     is_translator: boolean;
//     profile_background_color: string;
//     profile_background_image_url: string;
//     profile_background_image_url_https: string;
//     profile_background_tile: boolean;
//     profile_link_color: string;
//     profile_sidebar_border_color: string;
//     profile_sidebar_fill_color: string;
//     profile_text_color: string;
//     profile_use_background_image: boolean;
//     profile_image_url: string;
//     profile_image_url_https: string;
//     profile_banner_url: string;
//     default_profile: boolean;
//     default_profile_image: boolean;
//     following: null;
//     follow_request_sent: null;
//     notifications: null;
//   };
//   geo: null;
//   coordinates: null;
//   place: null;
//   contributors: null;
//   is_quote_status: boolean;
//   extended_tweet?: {
//     full_text: string;
//     display_text_range: [number, number];
//     entities: {
//       hashtags: any[];
//       urls: any[];
//       user_mentions: any[];
//       symbols: any[];
//       media: [
//         {
//           id: number;
//           id_str: string;
//           indices: [number, number];
//           media_url: string;
//           media_url_https: string;
//           url: string;
//           display_url: string;
//           expanded_url: string;
//           type: string;
//           sizes: {
//             thumb: { w: number; h: number; resize: string };
//             small: { w: number; h: number; resize: string };
//             large: { w: number; h: number; resize: string };
//             medium: { w: number; h: number; resize: string };
//           };
//         }
//       ];
//     };
//     extended_entities: {
//       media: [
//         {
//           id: number;
//           id_str: string;
//           indices: [number, number];
//           media_url: string;
//           media_url_https: string;
//           url: string;
//           display_url: string;
//           expanded_url: string;
//           type: string;
//           sizes: {
//             thumb: { w: number; h: number; resize: string };
//             small: { w: number; h: number; resize: string };
//             large: { w: number; h: number; resize: string };
//             medium: { w: number; h: number; resize: string };
//           };
//         }
//       ];
//     };
//   };
//   quote_count: number;
//   reply_count: number;
//   retweet_count: number;
//   favorite_count: number;
//   entities: {
//     hashtags: any[];
//     urls: [
//       {
//         url: string;
//         expanded_url: string;
//         display_url: string;
//         indices: [number, number];
//       }
//     ];
//     user_mentions: any[];
//     symbols: any[];
//   };
//   favorited: boolean;
//   retweeted: boolean;
//   possibly_sensitive: boolean;
//   filter_level: string;
//   lang: string;
//   timestamp_ms: string;
// };

// Generated by https://quicktype.io

export interface Tweet {
  created_at: string;
  isUserNode?: boolean;
  id: number;
  id_str: string;
  text: string;
  display_text_range?: number[];
  source: string;
  truncated: boolean;
  in_reply_to_status_id: number | null;
  in_reply_to_status_id_str: null | string;
  in_reply_to_user_id: number | null;
  in_reply_to_user_id_str: null | string;
  in_reply_to_screen_name: null | string;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entities: TweetEntities;
  favorited: boolean;
  retweeted: boolean;
  filter_level: FilterLevel;
  lang: string;
  timestamp_ms: string;
  sentimentResult: SentimentResult;
  retweeted_status?: RetweetedStatus;
  possibly_sensitive?: boolean;
  extended_entities?: TweetExtendedEntities;
  extended_tweet?: TweetExtendedTweet;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  quoted_status?: QuotedStatus;
  quoted_status_permalink?: QuotedStatusPermalink;
}

export interface TweetEntities {
  hashtags: Hashtag[];
  urls: URL[];
  user_mentions: UserMention[];
  symbols: any[];
  media?: PurpleMedia[];
}

export interface Hashtag {
  text: string;
  indices: number[];
}

export interface PurpleMedia {
  id: number;
  id_str: string;
  indices: number[];
  additional_media_info?: PurpleAdditionalMediaInfo;
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: Type;
  sizes: Sizes;
  source_status_id?: number;
  source_status_id_str?: string;
  source_user_id?: number;
  source_user_id_str?: string;
  video_info?: VideoInfo;
}

export interface PurpleAdditionalMediaInfo {
  monetizable: boolean;
}

export interface Sizes {
  thumb: Large;
  small: Large;
  large: Large;
  medium: Large;
}

export interface Large {
  w: number;
  h: number;
  resize: Resize;
}

export enum Resize {
  Crop = "crop",
  Fit = "fit",
}

export enum Type {
  Photo = "photo",
  Video = "video",
}

export interface VideoInfo {
  aspect_ratio: number[];
  duration_millis: number;
  variants: Variant[];
}

export interface Variant {
  bitrate?: number;
  content_type: ContentType;
  url: string;
}

export enum ContentType {
  ApplicationXMPEGURL = "application/x-mpegURL",
  VideoMp4 = "video/mp4",
}

export interface URL {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface UserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

export interface TweetExtendedEntities {
  media: PurpleMedia[];
}

export interface TweetExtendedTweet {
  full_text: string;
  display_text_range: number[];
  entities: QuotedStatusEntities;
  extended_entities?: QuotedStatusExtendedEntities;
}

export interface QuotedStatusEntities {
  hashtags: any[];
  urls: any[];
  user_mentions: UserMention[];
  symbols: any[];
  media?: FluffyMedia[];
}

export interface FluffyMedia {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: DisplayURL;
  expanded_url: string;
  type: Type;
  sizes: Sizes;
  additional_media_info?: FluffyAdditionalMediaInfo;
  video_info?: VideoInfo;
}

export interface FluffyAdditionalMediaInfo {
  title?: string;
  description?: string;
  embeddable?: boolean;
  monetizable: boolean;
}

export enum DisplayURL {
  PicTwitterCOMBMyyKoD9IC = "pic.twitter.com/BMyyKoD9Ic",
  PicTwitterCOMK6JjNBSGtt = "pic.twitter.com/K6jjNBSGtt",
  PicTwitterCOMNTROUhmbE1 = "pic.twitter.com/NtROUhmbE1",
}

export interface QuotedStatusExtendedEntities {
  media: FluffyMedia[];
}

export enum FilterLevel {
  Low = "low",
}

export interface QuotedStatus {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  display_text_range?: number[];
  source: string;
  truncated: boolean;
  in_reply_to_status_id: number | null;
  in_reply_to_status_id_str: null | string;
  in_reply_to_user_id: number | null;
  in_reply_to_user_id_str: null | string;
  in_reply_to_screen_name: null | string;
  // https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entities: QuotedStatusEntities;
  extended_entities?: QuotedStatusExtendedEntities;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive?: boolean;
  filter_level: FilterLevel;
  lang: string;
}

// https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object
export interface User {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: null | string;
  url: null | string;
  description: null | string;
  translator_type: TranslatorType;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  created_at: string;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  lang: null;
  contributors_enabled: boolean;
  is_translator: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_link_color: string;
  profile_sidebar_border_color: ProfileSidebarBorderColor;
  profile_sidebar_fill_color: ProfileSidebarFillColor;
  profile_text_color: string;
  profile_use_background_image: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url?: string;
  default_profile: boolean;
  default_profile_image: boolean;
  following: null;
  follow_request_sent: null;
  notifications: null;
}

export enum ProfileSidebarBorderColor {
  C0Deed = "C0DEED",
  Cc3366 = "CC3366",
  Eeeeee = "EEEEEE",
  Ffffff = "FFFFFF",
  The000000 = "000000",
  The86A4A6 = "86A4A6",
}

export enum ProfileSidebarFillColor {
  A0C5C7 = "A0C5C7",
  Ddeef6 = "DDEEF6",
  E5507E = "E5507E",
  Efefef = "EFEFEF",
  Ffffff = "FFFFFF",
  The000000 = "000000",
  The78C0A8 = "78C0A8",
  The7Ac3Ee = "7AC3EE",
}

export enum TranslatorType {
  None = "none",
  Regular = "regular",
}

export interface QuotedStatusPermalink {
  url: string;
  expanded: string;
  display: string;
}

export interface RetweetedStatus {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: Place | null;
  contributors: null;
  is_quote_status: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entities: TweetEntities;
  favorited: boolean;
  retweeted: boolean;
  filter_level: FilterLevel;
  lang: string;
  extended_tweet?: RetweetedStatusExtendedTweet;
  display_text_range?: number[];
  possibly_sensitive?: boolean;
  extended_entities?: TweetExtendedEntities;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  quoted_status?: QuotedStatus;
  quoted_status_permalink?: QuotedStatusPermalink;
}

export interface RetweetedStatusExtendedTweet {
  full_text: string;
  display_text_range: number[];
  entities: PurpleEntities;
  extended_entities?: PurpleExtendedEntities;
}

export interface PurpleEntities {
  hashtags: Hashtag[];
  urls: URL[];
  user_mentions: UserMention[];
  symbols: any[];
  media?: TentacledMedia[];
}

export interface TentacledMedia {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: Type;
  sizes: Sizes;
  additional_media_info?: FluffyAdditionalMediaInfo;
  video_info?: VideoInfo;
  source_user_id?: number;
  source_user_id_str?: string;
}

export interface PurpleExtendedEntities {
  media: TentacledMedia[];
}

export interface Place {
  id: string;
  url: string;
  place_type: string;
  name: string;
  full_name: string;
  country_code: string;
  country: string;
  bounding_box: BoundingBox;
  attributes: Attributes;
}

export interface Attributes {}

export interface BoundingBox {
  type: string;
  coordinates: Array<Array<number[]>>;
}

export interface SentimentResult {
  score: number;
  comparative: number;
  calculation: { [key: string]: number }[];
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
}