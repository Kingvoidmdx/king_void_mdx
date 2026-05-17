const { spotify } = require('spotify-url-info');

module.exports = {
  name: 'spotify',
  description: 'Download Spotify track',
  category: 'download',
  execute: async (message) => {
    const url = message.args[0];
    if (!url) return { success: false, message: `*_❌ Please provide a Spotify URL_*\n\n*_Usage:_* *_.spotify <url>_*` };

    try {
      const data = await spotify(url);
      const title = data.name || 'Unknown';
      const artist = data.artists?.map(a => a.name).join(', ') || 'Unknown';

      return { success: true, message: `*_🎵 Spotify Track Found_*\n\n*_Title:_* *_${title}_*\n*_Artist:_* *_${artist}_*\n\n*_⚠️ Spotify audio download requires a Spotify API key._*\n*_Get one free at:_* *_developer.spotify.com/dashboard_*\n\n*_Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env_*` };
    } catch (e) {
      return { success: false, message: `*_❌ Failed to fetch:_* *_${e.message}_*` };
    }
  }
};
