# BUP ITC Website

This repository contains the full BUP Info Tech Club website stack:

- `Frontend/`: public-facing website
- `AdminPanel/`: admin-only content management UI
- `Backend/`: Express API, MongoDB models, auth, uploads, and business logic

The project is plain HTML + Tailwind CDN + vanilla JavaScript on the client side, and Node.js + Express + MongoDB on the server side. There is no frontend framework and no build step.

## Current architecture

1. `Backend/server.js` starts the API server and serves uploaded files from `/uploads`.
2. `Frontend/pages/*.html` are static pages that fetch public data from the backend.
3. `AdminPanel/*.html` are static pages that call protected admin endpoints with a JWT stored in `localStorage`.

## Repository layout

- `Frontend/components/`: shared navbar, hero, and footer generators
- `Frontend/js/`: public page logic and card renderers
- `Frontend/assets/`: public static assets, including the fallback profile image
- `Frontend/pages/`: public HTML pages
- `AdminPanel/components/`: shared sidebar
- `AdminPanel/js/`: admin auth, API helpers, and CRUD pages
- `Backend/config/`: database and runtime config
- `Backend/controllers/`: public API controllers and compatibility wrappers
- `Backend/admin/`: admin controllers, admin routes, and admin auth middleware
- `Backend/models/`: Mongoose schemas
- `Backend/routes/`: public and compatibility routes
- `Backend/utils/`: shared upload and event-payload helpers
- `Backend/uploads/`: uploaded images

## Main functionality

Public site:

- Home page with animated hero, counters, featured events, featured executives, and latest press
- About page
- Events listing page plus dedicated event-details page
- Press page
- Executive page
- Alumni page grouped by batch
- Join page with registration-open/closed handling
- Application status checker by student ID or email

Admin panel:

- Admin login
- Registration open/close toggle
- Registration review with accept/reject actions
- Event CRUD with image upload
- Press CRUD with image upload
- Executive CRUD with image upload
- Alumni CRUD with image upload

Backend:

- Public read APIs
- Protected admin APIs
- JWT-based admin authentication
- MongoDB persistence
- Upload storage and cleanup

## Local development

### Requirements

- Node.js
- MongoDB

### Runtime config

The backend now supports environment variables, with safe local defaults:

- `PORT` default: `3000`
- `MONGODB_URI` default: `mongodb://127.0.0.1:27017/bup_itc`
- `JWT_SECRET` default: `supersecretkey`

### Start the backend

From `Backend/`:

```bash
npm start
```

or:

```bash
node server.js
```

### Seed the admin account

From `Backend/`:

```bash
npm run create-admin
```

Current seeded credentials:

- username: `admin`
- password: `admin123`

The seed script is idempotent now. Re-running it updates or creates the default admin account instead of blindly inserting duplicates.

### Serve the public site and admin panel

Serve `Frontend/` and `AdminPanel/` over HTTP, not `file://`, because the pages use ES modules and `fetch()`.

Common options:

- VS Code Live Server
- Any static file server
- Any reverse proxy that serves the static files and forwards API traffic to the backend

## Current behavior that matters to maintainers

- All public collection read endpoints now return plain arrays.
- Public events also expose `GET /api/events/:id`, which powers `event-details.html?id=<eventId>`.
- Admin content routes are protected server-side with JWT middleware.
- `PUT /api/settings` is protected server-side and used by the admin dashboard.
- Event tags are normalized to arrays on write and normalized again on read for older data.
- Executives now use `department` consistently across backend, admin UI, and public rendering.
- Profile-image fallback now points to a real asset: `Frontend/assets/images/executives/default.svg`.
- Replacing or deleting uploaded content now cleans up old files from `Backend/uploads/`.
- Event cards now deep-link to the dedicated event-details page instead of looping back to `events.html`.
- Legacy compatibility endpoints still exist for some flows, but sensitive ones are protected.

## Documentation map

- `README.md`: quick orientation and startup guide
- `MAINTAINER_GUIDE.md`: detailed maintainer reference
- `ITC_Website_Source.txt`: short legacy pointer to the current docs

Read `MAINTAINER_GUIDE.md` before changing routes, models, auth, uploads, or admin flows.
