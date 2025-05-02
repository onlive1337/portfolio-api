export interface SpotifyArtist {
    name: string;
  }
  
  export interface SpotifyAlbum {
    name: string;
    images: { url: string }[];
  }
  
  export interface SpotifyTrack {
    is_playing: boolean;
    item?: {
      name: string;
      artists: SpotifyArtist[];
      album: SpotifyAlbum;
      external_urls: {
        spotify: string;
      };
    };
  }
  
  export interface GithubRepository {
    name: string;
    description: string | null;
    url: string;
    stargazerCount: number;
    primaryLanguage: {
      name: string;
    } | null;
    repositoryTopics: {
      nodes: {
        topic: {
          name: string;
        };
      }[];
    };
  }
  
  export interface GithubResponse {
    data: {
      user: {
        pinnedItems: {
          nodes: GithubRepository[];
        };
      };
    };
  }

  export interface LastFmTrack {
    name: string; 
    artist: string; 
    album: string; 
    albumImageUrl: string; 
    url: string;
    isNowPlaying: boolean;
    timestamp?: string; 
  }

  export interface StatsFmTrack {
    name: string;
    artists: string;
    album: string;
    albumImageUrl: string;
    url: string;
    isPlaying: boolean;
    progressMs: number;
    platform: string;
    spotifyPopularity: number;
    explicit: boolean;
    durationMs: number;
    date: string | null;
  }

export interface YandexTrack {
  name: string;
  artists: string;
  album: string;
  albumImageUrl: string;
  url: string;
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  explicit: boolean;
  platform: string;
}