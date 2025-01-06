export default function Home() {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>Portfolio API Documentation</h1>
        
        <h2>Available Endpoints:</h2>
        
        <h3>GET /api/spotify</h3>
        <p>Returns current playing track from Spotify</p>
        
        <h3>GET /api/steam</h3>
        <p>Returns current or recent game activity from Steam</p>
        
        <h3>GET /api/github</h3>
        <p>Returns pinned repositories from GitHub</p>
        
        <h3>GET /api/discord</h3>
        <p>Returns discord status</p>
        

        <p>Note: This API is intended for use with https://onlive.is-a.dev</p>
      </div>
    )
  }