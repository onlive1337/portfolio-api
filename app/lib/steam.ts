const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

export async function getCurrentGame() {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`
    );
    
    if (!response.ok) {
      console.error(`Steam API returned status: ${response.status}`);
      const text = await response.text();
      console.error(`Response body preview: ${text.substring(0, 200)}...`);
      return null;
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Steam API returned non-JSON content type: ${contentType}`);
      const text = await response.text();
      console.error(`Response body preview: ${text.substring(0, 200)}...`);
      return null;
    }
    
    const data = await response.json();
    
    if (!data?.response?.players?.[0]) {
      console.warn('No player data found in Steam API response');
      return null;
    }

    const player = data.response.players[0];

    if (player.gameextrainfo && player.gameid) {
      return {
        name: player.gameextrainfo,
        gameId: player.gameid,
        imageUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${player.gameid}/header.jpg`,
        isPlaying: true,
      };
    }

    try {
      const recentGamesResponse = await fetch(
        `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`
      );
      
      if (!recentGamesResponse.ok) {
        console.error(`Steam Recent Games API returned status: ${recentGamesResponse.status}`);
        return null;
      }
      
      const recentContentType = recentGamesResponse.headers.get('content-type');
      if (!recentContentType || !recentContentType.includes('application/json')) {
        console.error(`Steam Recent Games API returned non-JSON content type: ${recentContentType}`);
        return null;
      }
      
      const recentGames = await recentGamesResponse.json();

      if (recentGames?.response?.games?.[0]) {
        const topGame = recentGames.response.games[0];
        return {
          name: topGame.name,
          gameId: topGame.appid.toString(),
          imageUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${topGame.appid}/header.jpg`,
          isPlaying: false,
          playTime2Weeks: topGame.playtime_2weeks,
        };
      }
    } catch (recentGamesError) {
      console.error('Error fetching recent Steam games:', recentGamesError);
    }

    return null;
  } catch (error) {
    console.error('Error fetching Steam data:', error);
    return null;
  }
}