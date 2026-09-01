# Around the U.S. — React + Auth

A React-based social photo-sharing app where users can explore and share photos of places around the United States. This sprint adds user registration, authorization and protected routes on top of the existing React application.

## Features

### Authentication

- Register a new account with email and password
- Log in and stay logged in across page reloads (JWT stored in `localStorage`)
- Token validity checked against the server on every app start
- Protected route — unauthorized visitors are redirected to the login page
- Header adapts to the session: sign-up / sign-in links for guests, email and sign-out for logged-in users
- Modal tooltip reporting success or failure after registration

### Main application

- View a gallery of location cards fetched from the API
- Like and unlike cards — state updates instantly without page reload
- Delete your own cards
- Edit your profile name and description
- Update your profile avatar via URL
- Add new location cards with a title and image URL
- All changes persist to the server in real time

## Tech Stack

- **React 19** — component-based UI
- **React Router 7** — client-side routing and route protection
- **Vite** — development server and bundler
- **Context API** — global user state shared across components
- **localStorage** — token persistence between sessions
- **REST API** — two separate backends (see [API](#api))

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Protected | Main application — profile and card gallery |
| `/signin` | Public | Login form |
| `/signup` | Public | Registration form |
| `*` | — | Redirects to `/` or `/signin` depending on session |

## Project Structure

```
src/
  main.jsx                   # Entry point — mounts BrowserRouter
  components/
    App.jsx                  # Root component — state, API calls, handlers, routes
    Header/                  # Header shell — receives its nav through children
    NavBar/                  # Nav variants: sign-up, sign-in, logged-in
    Login/                   # Login form
    Register/                # Registration form
    ProtectedRoute/          # Guards the private route
    InfoTooltip/             # Success / error modal
    Footer/
    Main/                    # Profile section + card grid + popups
      components/
        Card/                # Individual location card
        ImagePopup/          # Full-size image popup
        Popup/               # Reusable popup wrapper
        form/
          EditProfile/       # Edit name and description
          EditAvatar/        # Edit avatar via URL
          NewCard/           # Add a new location card
  contexts/
    CurrentUserContext.js    # Global user context
  utils/
    api.js                   # Main API class and instance
    auth.js                  # Registration, login and token check
  index.css                  # Imports every stylesheet in blocks/

blocks/                      # BEM stylesheets (auth, tooltip, header, …)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

## API

This sprint talks to **two independent backends**. They will be merged into a single API in the next sprint.

### Authentication API

```
https://se-register-api.en.tripleten-services.com/v1
```

Handled in `src/utils/auth.js`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/signin` | Log in and receive a JWT |
| GET | `/users/me` | Validate the token and read the user's email |

Requests to `/users/me` carry the token as `Authorization: Bearer <jwt>`.

### Main API

```
https://around-api.es.tripleten-services.com/v1
```

Handled in `src/utils/api.js`. Profile and card endpoints live only on this server — the authentication API does not expose them.

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

## Authentication Flow

1. **Register** — `POST /signup` returns the new user's email and id, but no token. On success the user is redirected to `/signin`.
2. **Log in** — `POST /signin` returns a JWT, which is saved to `localStorage` under the `jwt` key.
3. **Reload** — on every mount, the app reads the stored token and validates it with `GET /users/me`. While that request is in flight the app renders a loading state, so a valid session is never mistaken for a missing one.
4. **Sign out** — the token is removed from `localStorage` and the user returns to `/signin`.
