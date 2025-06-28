# Weather Analytics Dashboard

## Overview

This is a full-stack weather analytics dashboard built with React and Express, designed to visualize historical weather data using the Open-Meteo Archive API. The application provides interactive charts and insights for temperature, precipitation, and wind speed data across multiple global locations.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Context API for global app state (date range, location)
- **Data Fetching**: TanStack React Query for API state management and caching
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Charts**: Recharts library for data visualization
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for server bundling

### Data Flow Pattern
- **API Strategy**: Direct frontend calls to Open-Meteo Archive API (no backend proxy)
- **Caching**: React Query handles API response caching with 5-minute stale time
- **Error Handling**: Built-in retry logic and error boundary patterns

## Key Components

### Data Layer
- **Weather API**: Integration with Open-Meteo Archive API for historical weather data
- **Location Management**: Static configuration of 6 global cities with lat/long coordinates
- **Date Range**: Support for up to 3-month historical data periods

### UI Components
- **Overview Page**: Three main charts (temperature trends, precipitation, wind speed)
- **Detailed Insights Page**: Configurable dual-parameter hourly data visualization
- **Filter Bar**: Date range picker and location selector
- **Responsive Design**: Adaptive layouts for mobile to desktop screen sizes

### Chart Types
- **Temperature Chart**: Line chart showing daily mean, max, and min temperatures
- **Precipitation Chart**: Bar chart displaying daily precipitation sums
- **Wind Speed Chart**: Line chart for daily maximum wind speeds
- **Detailed Chart**: Configurable line chart with up to 2 parameters and dual Y-axes

## Data Flow

1. **User Interaction**: Users select date range (max 3 months) and location via filter bar
2. **State Management**: App context stores and distributes filter state across components
3. **API Calls**: React Query hooks fetch data from Open-Meteo API based on current filters
4. **Data Processing**: Raw API responses are transformed for chart consumption
5. **Visualization**: Recharts renders interactive charts with processed data
6. **Navigation**: Click handlers on overview charts navigate to detailed insights page

## External Dependencies

### API Services
- **Open-Meteo Archive API**: Historical weather data source
  - Daily parameters: temperature_2m_mean, temperature_2m_max, temperature_2m_min, precipitation_sum, wind_speed_10m_max
  - Hourly parameters: temperature_2m, relative_humidity_2m, apparent_temperature, precipitation, sea_level_pressure, wind_speed_10m

### Key Libraries
- **@tanstack/react-query**: API state management and caching
- **recharts**: Chart visualization library
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation and formatting
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework

## Deployment Strategy

### Development
- **Hot Reload**: Vite dev server with HMR
- **Error Overlay**: Runtime error modal for development
- **File Watching**: tsx for server-side TypeScript execution

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Environment**: PostgreSQL database configured via Drizzle (though not currently used for weather data)

### Database Setup
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Provider**: Neon Database serverless connection
- **Schema**: Basic user table structure (prepared for future authentication features)
- **Migrations**: Drizzle-kit for schema management

## Changelog
- June 28, 2025: Initial setup
- June 28, 2025: Fixed page structure to match design - swapped Drilldown (single chart) as first page and Overview (3 charts) as second page

## User Preferences

Preferred communication style: Simple, everyday language.