
    export interface ExternalUrls {
        spotify: string;
    }

    export interface Followers {
        href?: any;
        total: number;
    }

    export interface Image {
        url: string;
    }

    export interface ExternalUrls2 {
        spotify: string;
    }

    export interface Owner {
        external_urls: ExternalUrls2;
        href: string;
        id: string;
        type: string;
        uri: string;
    }

    export interface ExternalUrls3 {
        spotify: string;
    }

    export interface AddedBy {
        external_urls: ExternalUrls3;
        href: string;
        id: string;
        type: string;
        uri: string;
    }

    export interface ExternalUrls4 {
        spotify: string;
    }

    export interface Image2 {
        height: number;
        url: string;
        width: number;
    }

    export interface Album {
        album_type: string;
        available_markets: string[];
        external_urls: ExternalUrls4;
        href: string;
        id: string;
        images: Image2[];
        name: string;
        type: string;
        uri: string;
    }

    export interface ExternalUrls5 {
        spotify: string;
    }

    export interface Artist {
        external_urls: ExternalUrls5;
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }

    export interface ExternalIds {
        isrc: string;
    }

    export interface ExternalUrls6 {
        spotify: string;
    }

    export interface Track {
        album: Album;
        artists: Artist[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        selected: boolean;
        external_ids: ExternalIds;
        external_urls: ExternalUrls6;
        href: string;
        id: string;
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
    }

    export interface Item {
        added_at: Date;
        added_by: AddedBy;
        is_local: boolean;
        track: Track;
    }

    export interface Tracks {
        href: string;
        items: Item[];
        limit: number;
        next: string;
        offset: number;
        previous?: any;
        total: number;
    }

    export interface Playlist {
        collaborative: boolean;
        description: string;
        external_urls: ExternalUrls;
        followers: Followers;
        href: string;
        id: string;
        images: Image[];
        name: string;
        owner: Owner;
        public?: any;
        snapshot_id: string;
        tracks: Tracks;
        type: string;
        uri: string;
    }

