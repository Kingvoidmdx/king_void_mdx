module.exports = {
  name: 'news',
  description: 'Get latest news',
  category: 'tools',
  execute: async () => {
    return { success: true, message: `*_📰 Fetching latest news..._*

*_⚠️ Requires news API key_*` };
  }
};
