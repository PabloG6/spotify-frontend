import { ExternalUrls } from "./external_urls.interface";

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}


export interface Followers {
  href?: any;
  total: number;
}

export interface Image {
  height?: any;
  url: string;
  width?: any;
}

export interface Profile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}
