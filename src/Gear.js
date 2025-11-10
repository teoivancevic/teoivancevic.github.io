import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchAllArenaData, fetchChannelContents } from './services/arenaApi';
import ArenaItem from './components/ArenaItem';
import Subchannel from './components/Subchannel';

const ROOT_CHANNEL_SLUG = 'website-acctkinyxak';

const Gear = () => {
  const [arenaData, setArenaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSubchannels, setExpandedSubchannels] = useState(new Set());
  const [subchannelContents, setSubchannelContents] = useState(new Map());
  const [loadingSubchannels, setLoadingSubchannels] = useState(new Set());

  const loadArenaData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllArenaData();
      setArenaData(data);
    } catch (err) {
      console.error('Error loading arena data:', err);
      setError(err.message || 'Failed to load gear data');
    } finally {
      setLoading(false);
    }
  };

  const toggleSubchannel = async (subchannelId) => {
    const newExpanded = new Set(expandedSubchannels);
    
    if (newExpanded.has(subchannelId)) {
      newExpanded.delete(subchannelId);
    } else {
      newExpanded.add(subchannelId);
      
      // Fetch contents if not already cached
      if (!subchannelContents.has(subchannelId)) {
        setLoadingSubchannels(prev => new Set(prev).add(subchannelId));
        
        try {
          const channelData = await fetchChannelContents(subchannelId);
          const contents = channelData.contents || [];
          setSubchannelContents(prev => new Map(prev).set(subchannelId, contents));
        } catch (err) {
          console.error('Error fetching subchannel contents:', err);
        } finally {
          setLoadingSubchannels(prev => {
            const newSet = new Set(prev);
            newSet.delete(subchannelId);
            return newSet;
          });
        }
      }
    }
    
    setExpandedSubchannels(newExpanded);
  };

  const isSubchannelExpanded = (subchannelId) => {
    return expandedSubchannels.has(subchannelId);
  };

  useEffect(() => {
    loadArenaData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-[#888888]">Loading gear...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#001122] mb-4">Error Loading Gear</h1>
          <p className="text-[#888888] mb-6">{error}</p>
          <button
            onClick={loadArenaData}
            className="bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition-colors"
          >
            Try Again
          </button>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center text-[#888888] hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!arenaData?.channels?.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#001122] mb-4">No Gear Found</h1>
          <p className="text-[#888888] mb-6">
            No channels found in your Are.na profile. Make sure your channels are public and try again.
          </p>
          <button
            onClick={loadArenaData}
            className="bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition-colors"
          >
            Refresh
          </button>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center text-[#888888] hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] flex justify-left p-8">
      <div className="w-full max-w-[600px]">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-[#888888] hover:text-green-400 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-[#001122] mb-2">
            <span className="bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">Gear</span>
          </h1>
          <p className="text-xl text-[#888888]">
            My collection of tools, resources, and inspiration from Are.na
          </p>
        </div>

        <div className="space-y-8">
          {arenaData.channels.map((channel) => (
            <div key={channel.id}>
              <h2 className="text-2xl font-bold text-[#001122] mb-2">
                {channel.title}
              </h2>
              {channel.description && (
                <p className="text-xl text-[#888888] mb-4">{channel.description}</p>
              )}
              <div className="text-sm text-[#888888] mb-4">
                {channel.length || 0} items
              </div>

              <div className="overflow-x-auto overflow-y-hidden pb-2">
                <div className="flex flex-row flex-nowrap gap-3">
                  {channel.contents?.map((item) => (
                    <div key={item.id} className={item.class === 'Channel' ? 'flex-none w-80' : 'flex-none w-64'}>
                      {item.class === 'Channel' ? (
                        <Subchannel
                          subchannel={item}
                          isExpanded={isSubchannelExpanded(item.id)}
                          contents={subchannelContents.get(item.id) || []}
                          isLoading={loadingSubchannels.has(item.id)}
                          onToggle={toggleSubchannel}
                        />
                      ) : (
                        <ArenaItem item={item} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gear;