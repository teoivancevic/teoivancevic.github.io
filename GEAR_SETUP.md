# Gear Page Setup

This document explains how to set up the Are.na API integration for the gear page.

## Overview

The gear page displays items from your Are.na channels, grouped by channel. It's located at `/gear` and shows a curated collection of tools, resources, and inspiration.

## Setup Instructions

### 1. Get Are.na API Access Token

1. Go to [Are.na Account Applications](https://www.are.na/account/applications)
2. Create a new application
3. Copy your access token

### 2. Configure Environment Variables

Create a `.env` file in the project root with your Are.na access token:

```bash
REACT_APP_ARENA_ACCESS_TOKEN=your_arena_access_token_here
```

### 3. API Integration

The gear page will automatically:
- Try to fetch real data from your Are.na channels
- Fall back to mock data if the API call fails
- Display items grouped by channel

### 4. Customization

You can customize the gear page by:

- **Adding more channels**: Update the `getMockArenaData()` function in `src/services/arenaApi.js`
- **Changing the layout**: Modify the grid layout in `src/Gear.js`
- **Adding filters**: Implement filtering by item type or channel
- **Styling**: Update the Tailwind classes to match your design

## File Structure

```
src/
├── Gear.js                 # Main gear page component
├── services/
│   └── arenaApi.js         # Are.na API service
└── App.js                  # Updated with routing
```

## Features

- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Graceful fallback to mock data
- **External Links**: Items link to their source URLs
- **Item Types**: Different icons for different content types
- **Channel Grouping**: Items are organized by Are.na channels

## Development

The page currently uses mock data for development. To use real Are.na data:

1. Set up your `.env` file with the access token
2. Ensure your Are.na channels are public or you have proper permissions
3. The API will automatically fetch your channel data

## Troubleshooting

- **API Errors**: Check your access token and network connection
- **Empty Channels**: Ensure your Are.na channels have content
- **CORS Issues**: Are.na API should handle CORS, but check browser console for errors