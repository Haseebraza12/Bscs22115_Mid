# Movie Explorer

A React-based web application that allows users to browse and search for movies using the OMDB API. The application features multi-page routing, state management, and detailed movie information.

## Features

### Core Functionality
- **Movie Search**: Search for movies by title using the OMDB API
- **Movie Details**: View detailed information about each movie
- **Favorites System**: Add/remove movies to favorites list
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Works on desktop and mobile devices

### Technical Features
- **React Components**
  - MovieList: Displays grid of movie cards
  - MovieItem: Individual movie card with basic info
  - SearchBar: Search functionality
  - Header & Footer: Navigation and layout components
  - MovieDetails: Detailed movie information page

- **State Management**
  - Local state using useState for:
    - Search queries
    - Loading states
    - Movie data
  - Global state using Context for:
    - Theme preferences
    - Favorites list

- **Routing**
  - Home page (/)
  - Movie details (/movie/:id)
  - Favorites page (/favorites)

### API Integration
- OMDB API integration using Axios
- Error handling for failed API requests
- Loading states during API calls

