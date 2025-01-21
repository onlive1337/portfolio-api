const OSU_CLIENT_ID = process.env.OSU_CLIENT_ID;
const OSU_CLIENT_SECRET = process.env.OSU_CLIENT_SECRET;
const OSU_USERNAME = process.env.OSU_USERNAME

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAccessToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await fetch('https://osu.ppy.sh/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: OSU_CLIENT_ID,
        client_secret: OSU_CLIENT_SECRET,
        grant_type: 'client_credentials',
        scope: 'public',
      }),
    });

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000);
    return accessToken;
  } catch (error) {
    console.error('Error getting osu! access token:', error);
    return null;
  }
}

export async function getOsuData() {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const userResponse = await fetch(`https://osu.ppy.sh/api/v2/users/${OSU_USERNAME}/osu`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const userData = await userResponse.json();

    const activityResponse = await fetch(
      `https://osu.ppy.sh/api/v2/users/${OSU_USERNAME}/recent_activity`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    const activityData = await activityResponse.json();

    return {
      user: userData,
      recentActivity: activityData[0]
    };
  } catch (error) {
    console.error('Error fetching osu! data:', error);
    return null;
  }
}