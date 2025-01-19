# Portfolio API

Backend API service for personal portfolio website that provides realtime data about Discord status, Spotify currently playing track, Steam gaming activity, GitHub repositories, and anonymous messaging system.

## 🚀 Features

- **Realtime Integration**
  - Discord presence status
  - Spotify current track
  - Steam gaming activity
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
    "html_url": "https://github.com/onlive1337/repository-name",
    "stargazers_count": 5,
    "language": "TypeScript",
    "topics": ["nextjs", "typescript", "api"]
  }
]
```

### Messages
```
GET /api/messages
```
Returns list of recent anonymous messages.

```
POST /api/messages
```
Create new anonymous message.

**Request Body:**
```json
{
  "content": "Message text"
}
```

### Analytics
```
GET /api/analytics
```
Returns site analytics data.

```
POST /api/analytics
```
Record new site visit.

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Discord Developer Application
- Spotify Developer Account
- Steam API Key
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

# Steam
STEAM_API_KEY=your_steam_api_key
STEAM_ID=your_steam_id

# GitHub
GITHUB_TOKEN=your_github_personal_access_token

# API Config
CORS_ORIGIN=https://your-frontend-domain.com
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

The API is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/onlive1337/portfolio-api/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Developer - [@onswix](https://t.me/onswix)
GitHub - [@onlive1337](https://github.com/onlive1337)

Project Link: [https://github.com/onlive1337/portfolio-api](https://github.com/onlive1337/portfolio-api)
