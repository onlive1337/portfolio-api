export interface OsuUser {
    username: string;
    statistics: {
      pp: number;
      global_rank: number;
      level: {
        current: number;
        progress: number;
      };
      hit_accuracy: number;
      play_count: number;
      total_hits: number;
    };
    country_code: string;
    avatar_url: string;
  }
  
  export interface OsuActivity {
    created_at: string;
    id: number;
    type: string;
    scoreRank?: string;
    beatmap?: {
      url: string;
      title: string;
      difficulty_rating: number;
    };
    mode: string;
    pp?: number;
    rank?: string;
  }