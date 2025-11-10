// Are.na API service
// Fetching channels from your Are.na profile with authentication

const ARENA_API_BASE = 'https://api.are.na/v2';
const ARENA_ACCESS_TOKEN = process.env.REACT_APP_ARENA_ACCESS_TOKEN;
const ROOT_CHANNEL_SLUG = 'website-acctkinyxak';

// Fetch your root channel and its contents as main groups
export const fetchUserChannels = async () => {
  try {
    console.log(`Fetching root channel ${ROOT_CHANNEL_SLUG} with authentication`);
    
    // Fetch the root channel that contains all the main groups
    const response = await fetch(`${ARENA_API_BASE}/channels/${ROOT_CHANNEL_SLUG}`, {
      headers: {
        'Authorization': `Bearer ${ARENA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const rootChannel = await response.json();
    console.log('Root channel data:', rootChannel);
    
    // The main groups are the contents of the root channel
    const mainGroups = rootChannel.contents?.filter(item => item.class === 'Channel') || [];
    
    console.log(`Found ${mainGroups.length} main groups in root channel`);
    return { channels: mainGroups };
  } catch (error) {
    console.error('Error fetching root channel:', error);
    throw error;
  }
};

// Fetch all published channels (public channels only) - fallback
export const fetchAllChannels = async () => {
  try {
    console.log('Fetching all published channels');

    const headers = {};
    if (ARENA_ACCESS_TOKEN) {
      headers['Authorization'] = `Bearer ${ARENA_ACCESS_TOKEN}`;
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${ARENA_API_BASE}/channels`, {
      headers
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Channels data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw error;
  }
};

// Fetch specific channel contents (with authentication if available)
export const fetchChannelContents = async (channelId) => {
  try {
    const headers = {};
    if (ARENA_ACCESS_TOKEN) {
      headers['Authorization'] = `Bearer ${ARENA_ACCESS_TOKEN}`;
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${ARENA_API_BASE}/channels/${channelId}`, {
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching channel ${channelId} contents:`, error);
    throw error;
  }
};

// Fetch all channels with their contents
export const fetchAllArenaData = async () => {
  try {
    let userChannels = [];
    
    // First, try to get your channels using authenticated API
    if (ARENA_ACCESS_TOKEN) {
      try {
        console.log('Trying authenticated API first...');
        const userChannelsResponse = await fetchUserChannels();
        userChannels = userChannelsResponse.channels || [];
        console.log(`Found ${userChannels.length} channels via authenticated API`);
      } catch (authError) {
        console.log('Authenticated API failed, trying public API...', authError);
      }
    }
    
    // If no channels found via authenticated API, try public API
    if (userChannels.length === 0) {
      console.log('Trying public API as fallback...');
      const channelsResponse = await fetchAllChannels();
      const channels = channelsResponse.channels || [];

      // Filter channels by your username (teo-ivancevic)
      userChannels = channels.filter(channel => 
        channel.user && channel.user.slug === 'teo-ivancevic'
      );

      console.log(`Total public channels: ${channels.length}`);
      console.log(`Found ${userChannels.length} channels for teo-ivancevic in public API`);
    }

    // Then, fetch contents for each channel
    const channelsWithContents = await Promise.all(
      userChannels.map(async (channel) => {
        try {
          const channelData = await fetchChannelContents(channel.id);
          return {
            ...channel,
            contents: channelData.contents || []
          };
        } catch (error) {
          console.error(`Error fetching contents for channel ${channel.id}:`, error);
          return {
            ...channel,
            contents: []
          };
        }
      })
    );

    return {
      channels: channelsWithContents
    };
  } catch (error) {
    console.error('Error fetching all Are.na data:', error);
    throw error;
  }
};
