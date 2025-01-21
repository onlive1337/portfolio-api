# Portfolio API

Backend API service for personal portfolio website that provides realtime data about Discord status, Spotify currently playing track, Steam gaming activity, osu! statistics, GitHub repositories, and anonymous messaging system.

## 🚀 Features

- **Realtime Integration**
  - Discord presence status
  - Spotify current track
  - Last.fm current track
  - Steam gaming activity
  - osu! statistics and recent activity
  - GitHub pinned repositories
  - Anonymous messaging system
  - Site analytics

- **Tech Stack**
  - Next.js 13+ with App Router and Edge Runtime
  - TypeScript for type safety
  - Supabase for database
  - Edge Functions for optimal performance

- **Architecture**
  - RESTful API endpoints
  - Rate limiting
  - CORS support
  - Error handling

## 📚 API Endpoints

### Discord Status
```
GET /api/discord
```
Returns current Discord presence status.

**Response Example:**
```json
{
  "status": "online" | "idle" | "dnd" | "offline"
}
```

### Spotify Current Track
```
GET /api/spotify
```
Returns currently playing track info from Spotify.

**Response Example:**
```json
{
  "isPlaying": true,
  "title": "Track Name",
  "artist": "Artist Name",
  "album": "Album Name",
  "albumImageUrl": "https://...",
  "songUrl": "https://..."
}
```

### osu! Statistics
```
GET /api/osu
```
Returns player statistics and recent activity from osu!.

**Response Example:**
```json
{
  "user": {
    "username": "player_name",
    "statistics": {
      "pp": 5000,
      "global_rank": 10000,
      "level": {
        "current": 100,
        "progress": 50
      },
      "hit_accuracy": 98.5,
      "play_count": 10000,
      "total_hits": 1000000
    },
    "country_code": "US",
    "avatar_url": "https://..."
  },
  "recentActivity": {
    "beatmap": {
      "title": "Map Name",
      "difficulty_rating": 5.5
    },
    "rank": "S",
    "pp": 250
  }
}
```

### Stats.fm Current Track
```
GET /api/statsfm
```
Returns currently playing track info from statsfm.

**Response Example:**
```json
{
  "name": "Track Name",
  "artists": "Artist Name",
  "album": "Album Name",
  "albumImageUrl": "https://...",
  "url": "https://...",
  "isPlaying": true,
  "progressMs": 00000,
  "platform": "SPOTIFY",
  "explicit": false,
  "durationMs": 11111
}
```
# Last.fm Track
```
GET /api/lastfm
```
Returns currently playing or last played track info from Last.fm.

**Response Example:**
```json
{
  "tracks": [{
    "name": "Track Name",
    "artist": "Artist Name",
    "album": "Album Name",
    "albumImageUrl": "https://lastfm.freetls.fastly.net/i/u/300x300/...",
    "url": "https://www.last.fm/music/Artist/_/Track",
    "isNowPlaying": true,
    "timestamp": "1622547600"
  }]
}


```
### Steam Activity
```
GET /api/steam
```
Returns current or recent gaming activity.

**Response Example:**
```json
{
  "isPlaying": true,
  "name": "Game Name",
  "gameId": "440",
  "imageUrl": "https://...",
  "playTime2Weeks": 120
}
```

### GitHub Repositories
```
GET /api/github
```
Returns pinned repositories from GitHub profile.

**Response Example:**
```json
[
  {
    "name": "repository-name",
    "description": "Repository description",
    "html_url": "https://github.com/username/repository-name",
    "stargazers_count": 5,
    "language": "TypeScript",
    "topics": ["nextjs", "typescript", "api"]
  }
]
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Discord Developer Application
- Spotify Developer Account
- Steam API Key
- osu! API credentials
- GitHub Personal Access Token

### Environment Variables

Create `.env` file with following variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# Spotify
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Last.fm
LASTFM_USERNAME=your_lastfm_username
LASTFM_API_KEY=your_lastfm_apikey

# Stats.fm
STATSFM_USERNAME=your_statsfm_username

# Steam
STEAM_API_KEY=your_steam_api_key
STEAM_ID=your_steam_id

# osu!
OSU_CLIENT_ID=your_osu_client_id
OSU_CLIENT_SECRET=your_osu_client_secret
OSU_USERNAME=your_osu_username

# GitHub
GITHUB_TOKEN=your_github_personal_access_token
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/onlive1337/portfolio-api.git
cd portfolio-api
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run development server
```bash
npm run dev
# or
yarn dev
```

The API will be available at `http://localhost:3000`

## 📦 Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Developer - [@onswix](https://t.me/onswix)

Project Link: [https://github.com/onlive1337/portfolio-api](https://github.com/onlive1337/portfolio-api)
