# Around the U.S. — React

A React-based social photo-sharing app where users can explore and share photos of places around the United States. This project is a migration of the original vanilla JavaScript version, now connected to a live REST API.

## Features

- View a gallery of location cards fetched from the API
- Like and unlike cards — state updates instantly without page reload
- Delete your own cards
- Edit your profile name and description
- Update your profile avatar via URL
- Add new location cards with a title and image URL
- All changes persist to the server in real time

## Tech Stack

- **React 19** — component-based UI
- **Vite** — development server and bundler
- **Context API** — global user state shared across components
- **REST API** — all data fetched from and saved to a remote server

## Project Structure

```
src/
  App.jsx                  # Root component — state, API calls, handlers
  contexts/
    CurrentUserContext.js  # Global user context
  utils/
    api.js                 # API class and instance
  components/
    Header/
    Footer/
    Main/                  # Profile section + card grid + popups
      components/
        Card/              # Individual location card
        ImagePopup/        # Full-size image popup
        Popup/             # Reusable popup wrapper
        form/
          EditProfile/     # Edit name and description
          EditAvatar/      # Edit avatar via URL
          NewCard/         # Add a new location card
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## API

This project connects to the TripleTen Around API:

```
https://around-api.es.tripleten-services.com/v1
```

Endpoints used:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get current user info |
| PATCH | `/users/me` | Update profile name and description |
| PATCH | `/users/me/avatar` | Update profile avatar |
| GET | `/cards` | Get all cards |
| POST | `/cards` | Add a new card |
| DELETE | `/cards/:id` | Delete a card |
| PUT | `/cards/:id/likes` | Like a card |
| DELETE | `/cards/:id/likes` | Unlike a card |
