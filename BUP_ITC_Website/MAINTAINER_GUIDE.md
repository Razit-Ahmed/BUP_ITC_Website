# BUP ITC Website Maintainer Guide

This guide describes the codebase as it works now. It is intended for the next maintainer who needs to understand behavior quickly, modify the system safely, and know which files to touch for each feature.

## 1. System overview

The project has three parts:

- `Frontend/`: public website
- `AdminPanel/`: admin-only website
- `Backend/`: Express server and MongoDB layer

There is no frontend framework, no bundler, and no server-rendered HTML. Every page is a static HTML file that loads vanilla JavaScript and talks to the backend over HTTP.

## 2. Runtime model

### 2.1 Backend

`Backend/server.js` does the following:

- enables CORS
- enables JSON body parsing
- connects to MongoDB
- serves uploaded files from `/uploads`
- mounts public routes under `/api/*`
- mounts admin routes under `/admin/*`
- returns a JSON 404 for unknown routes

### 2.2 Runtime config

`Backend/config/env.js` centralizes runtime config and provides defaults:

- `PORT`: `3000`
- `MONGODB_URI`: `mongodb://127.0.0.1:27017/bup_itc`
- `JWT_SECRET`: `supersecretkey`

These can be overridden through environment variables.

### 2.3 Static sites

The public site and admin panel are both static. They must be served over HTTP because they rely on:

- ES module scripts
- `fetch()`
- `window.location.origin`

## 3. Data model

### 3.1 Admin

Fields:

- `username`
- `password`
- `createdAt`

Purpose:

- stores admin credentials for login

### 3.2 Event

Fields:

- `title`
- `description`
- `date`
- `time`
- `location`
- `image`
- `tags`
- `attendees`
- `createdAt`
- `updatedAt`

Notes:

- `tags` is stored as an array of strings
- write paths normalize comma-separated input into an array
- read paths normalize legacy malformed values for compatibility

### 3.3 Executive

Fields:

- `name`
- `position`
- `department`
- `image`
- `linkedin`
- `createdAt`
- `updatedAt`

Notes:

- `department` is now the canonical field everywhere

### 3.4 Alumni

Fields:

- `name`
- `position`
- `batch`
- `linkedin`
- `image`
- `createdAt`
- `updatedAt`

Notes:

- timestamps were added so newest-first admin sorting works correctly

### 3.5 Press

Fields:

- `title`
- `date`
- `description`
- `image`
- `category`
- `createdAt`
- `updatedAt`

### 3.6 Registration

Fields:

- `name`
- `studentId`
- `department`
- `batch`
- `email`
- `phone`
- `skills`
- `motivation`
- `portfolio`
- `status`
- `createdAt`
- `updatedAt`

Notes:

- `status` is validated against `pending`, `accepted`, and `rejected`
- admin status updates now run validators

### 3.7 Settings

Fields:

- `registrationOpen`

Notes:

- the application effectively treats this as a singleton document

## 4. Public site behavior

### 4.1 Home page

File:

- `Frontend/pages/index.html`

What it does:

- renders the animated hero area
- shows counter animations
- loads featured events
- loads featured executives
- loads the latest press items

Scripts involved:

- `Frontend/components/navbar.js`
- `Frontend/components/footer.js`
- `Frontend/js/events.js`
- `Frontend/js/executives.js`
- `Frontend/js/press.js`
- `Frontend/js/stats.js`
- `Frontend/js/particles.js`
- `Frontend/js/terminal.js`

### 4.2 About page

File:

- `Frontend/pages/about.html`

What it does:

- static club overview
- shared navbar/footer
- shared generated hero section

### 4.3 Events page

Files:

- `Frontend/pages/events.html`
- `Frontend/js/events.js`
- `Frontend/js/cards/eventCard.js`

Flow:

1. `events.js` calls `getEvents()` from `api.js`
2. `GET /api/events` returns a plain array
3. `events.js` renders every event into `#eventsContainer`
4. `createEventCard()` renders normalized tags, event metadata, and the event image
5. each card links to `event-details.html?id=<eventId>`

### 4.4 Event details page

Files:

- `Frontend/pages/event-details.html`
- `Frontend/js/eventDetails.js`

Flow:

1. `eventDetails.js` reads the `id` query parameter from the current URL
2. it requests `GET /api/events/:id`
3. the backend returns one normalized event document
4. the page renders a hero-style banner, description block, detail cards, and tag chips
5. on failure, the page renders a generic error state inside `#eventDetails`

Notes:

- image URLs are resolved through `resolveImageUrl()` from `Frontend/js/api.js`
- the page expects to be opened from an event card or any URL that includes a valid event ID

### 4.5 Press page

Files:

- `Frontend/pages/press.html`
- `Frontend/js/press.js`
- `Frontend/js/cards/pressCard.js`

Flow:

1. `press.js` calls `getPress()`
2. `GET /api/press` returns a plain array
3. `press.js` renders each item
4. `createPressCard()` handles image resolution and read-more toggling

### 4.6 Executive page

Files:

- `Frontend/pages/executive.html`
- `Frontend/js/executives.js`
- `Frontend/js/cards/executiveCard.js`

Flow:

1. `executives.js` calls `getExecutives()` from `api.js`
2. `GET /api/executives` returns a plain array
3. the home page filters down to President, General Secretary, and Vice President
4. `createExecutiveCard()` renders the profile image, department, position, and LinkedIn link

### 4.7 Alumni page

Files:

- `Frontend/pages/alumni.html`
- `Frontend/js/alumni.js`
- `Frontend/js/cards/executiveCard.js`

Flow:

1. `alumni.js` calls `getAlumni()`
2. `GET /api/alumni` returns a plain array
3. alumni are grouped by `batch`
4. each batch becomes a collapsible panel
5. alumni cards reuse the executive card renderer

### 4.8 Join page

Files:

- `Frontend/pages/join.html`
- `Frontend/js/join.js`

Flow:

1. `join.js` loads `GET /api/settings`
2. if `registrationOpen` is `true`, the membership form is shown
3. if `registrationOpen` is `false`, the form stays hidden and the page links to `check-status.html`
4. form submission calls `submitRegistration()` from `api.js`
5. `POST /api/registration` saves the application

Current collected fields:

- `name`
- `studentId`
- `department`
- `batch`
- `email`
- `phone`
- `skills`
- `portfolio`
- `motivation`

### 4.9 Check-status page

Files:

- `Frontend/pages/check-status.html`
- `Frontend/js/checkStatus.js`

Flow:

1. user submits either `studentId` or `email`
2. the page calls `GET /api/registration/status`
3. the backend returns `{ name, status }`
4. the page colors the status according to the current decision

## 5. Admin panel behavior

### 5.1 Login

Files:

- `AdminPanel/login.html`
- `AdminPanel/js/login.js`

Flow:

1. credentials are posted to `POST /admin/login`
2. the backend verifies the password with bcrypt
3. the backend returns `{ token }`
4. the browser stores the token in `localStorage` as `adminToken`
5. the user is redirected to `dashboard.html`

### 5.2 Client-side gatekeeping

File:

- `AdminPanel/js/authCheck.js`

What it does:

- redirects to `login.html` if `adminToken` is missing

Important note:

- real protection now exists on the server too
- the admin API helper also redirects to login on `401`

### 5.3 Shared admin API helper

File:

- `AdminPanel/js/adminApi.js`

Responsibilities:

- computes `API_BASE`
- adds the bearer token to protected requests
- parses JSON responses
- redirects to `login.html` on `401`
- exposes helpers for JSON and `FormData` requests

### 5.4 Dashboard / registration toggle

Files:

- `AdminPanel/dashboard.html`
- `AdminPanel/js/settingsAdmin.js`

Flow:

1. `settingsAdmin.js` loads `GET /api/settings`
2. the page shows whether registration is open
3. toggling the button sends `PUT /api/settings`
4. the request includes the bearer token
5. the backend requires `adminAuth` for writes

### 5.5 Registration review

Files:

- `AdminPanel/registrations.html`
- `AdminPanel/js/registrationsAdmin.js`

Flow:

1. `getRegistrations()` calls `GET /admin/registrations`
2. each card shows applicant data including portfolio
3. Accept/Reject buttons call `PATCH /admin/registrations/:id`

### 5.6 Events management

Files:

- `AdminPanel/events.html`
- `AdminPanel/js/eventsAdmin.js`

Flow:

1. the page loads all events from `GET /admin/events`
2. edit loads a single event from `GET /admin/events/:id`
3. create/update submit `FormData` to `/admin/events`
4. uploaded images are stored in `Backend/uploads/`
5. replacing an image removes the old file after a successful update
6. deleting an event also deletes the associated file

### 5.7 Press management

Files:

- `AdminPanel/press.html`
- `AdminPanel/js/pressAdmin.js`

Flow:

1. load press list from `GET /admin/press`
2. load one record from `GET /admin/press/:id`
3. create/update via multipart form
4. image cleanup works the same way as events

### 5.8 Executive management

Files:

- `AdminPanel/executives.html`
- `AdminPanel/js/executivesAdmin.js`

Flow:

1. load executives from `GET /admin/executives`
2. edit with `GET /admin/executives/:id`
3. submit `name`, `position`, `department`, `linkedin`, and optional image
4. the backend stores `department` consistently

### 5.9 Alumni management

Files:

- `AdminPanel/alumni.html`
- `AdminPanel/js/alumniAdmin.js`

Flow:

1. load alumni from `GET /admin/alumni`
2. edit with `GET /admin/alumni/:id`
3. submit `name`, `position`, `batch`, `linkedin`, and optional image
4. image cleanup works on update/delete

## 6. API reference

### 6.1 Public endpoints

- `GET /api/events`
  - returns: `Event[]`

- `GET /api/events/:id`
  - returns: `Event`

- `GET /api/press`
  - returns: `Press[]`

- `GET /api/executives`
  - returns: `Executive[]`

- `GET /api/alumni`
  - returns: `Alumni[]`

- `POST /api/registration`
  - body: membership application JSON
  - returns: `{ message, registration }`

- `GET /api/registration/status?studentId=...`
  - returns: `{ name, status }`

- `GET /api/registration/status?email=...`
  - returns: `{ name, status }`

- `GET /api/settings`
  - returns: settings document

### 6.2 Protected endpoints used by the admin panel

- `POST /admin/login`
  - returns: `{ token }`

- `GET /admin/registrations`
  - returns: `Registration[]`

- `PATCH /admin/registrations/:id`
  - returns: updated `Registration`

- `GET /admin/events`
  - returns: `Event[]`

- `GET /admin/events/:id`
  - returns: `Event`

- `POST /admin/events`
  - multipart form
  - returns: created `Event`

- `PUT /admin/events/:id`
  - multipart form
  - returns: updated `Event`

- `DELETE /admin/events/:id`
  - returns: `{ message }`

- `GET /admin/press`
  - returns: `Press[]`

- `GET /admin/press/:id`
  - returns: `Press`

- `POST /admin/press`
  - multipart form
  - returns: created `Press`

- `PUT /admin/press/:id`
  - multipart form
  - returns: updated `Press`

- `DELETE /admin/press/:id`
  - returns: `{ message }`

- `GET /admin/executives`
  - returns: `Executive[]`

- `GET /admin/executives/:id`
  - returns: `Executive`

- `POST /admin/executives`
  - multipart form
  - returns: created `Executive`

- `PUT /admin/executives/:id`
  - multipart form
  - returns: updated `Executive`

- `DELETE /admin/executives/:id`
  - returns: `{ message }`

- `GET /admin/alumni`
  - returns: `Alumni[]`

- `GET /admin/alumni/:id`
  - returns: `Alumni`

- `POST /admin/alumni`
  - multipart form
  - returns: created `Alumni`

- `PUT /admin/alumni/:id`
  - multipart form
  - returns: updated `Alumni`

- `DELETE /admin/alumni/:id`
  - returns: `{ message }`

- `PUT /api/settings`
  - protected by `adminAuth`
  - body: `{ registrationOpen: boolean }`
  - returns: updated settings document

### 6.3 Compatibility endpoints kept but protected

These are not used by the public site, but still exist:

- `POST /api/events`
  - protected
  - creates an event

- `GET /api/registration`
  - protected
  - returns all registrations

- `PATCH /api/registration/:id`
  - protected
  - updates registration status

The admin UI uses `/admin/*` routes instead of these paths.

## 7. File-by-file reference

### 7.1 Root docs

- `README.md`: quick-start and repo orientation
- `MAINTAINER_GUIDE.md`: detailed reference
- `ITC_Website_Source.txt`: compatibility pointer to the new docs

### 7.2 Backend config and startup

- `Backend/package.json`: backend scripts and dependencies
- `Backend/server.js`: app bootstrap and route mounting
- `Backend/config/env.js`: runtime config defaults
- `Backend/config/db.js`: MongoDB connection
- `Backend/createAdmin.js`: idempotent default-admin seeder

### 7.3 Backend models

- `Backend/models/Admin.js`
- `Backend/models/Event.js`
- `Backend/models/Executive.js`
- `Backend/models/Alumni.js`
- `Backend/models/Press.js`
- `Backend/models/Registration.js`
- `Backend/models/Settings.js`

### 7.4 Backend shared utilities

- `Backend/utils/eventPayload.js`
  - normalizes event tags
  - serializes legacy event values safely

- `Backend/utils/uploadFiles.js`
  - centralizes Multer storage
  - resolves upload paths
  - deletes replaced/deleted files safely

### 7.5 Backend public routes and controllers

- `Backend/routes/events.js`
- `Backend/routes/press.js`
- `Backend/routes/executives.js`
- `Backend/routes/alumni.js`
- `Backend/routes/registration.js`
- `Backend/routes/settings.js`
- `Backend/controllers/eventsController.js`
- `Backend/controllers/pressController.js`
- `Backend/controllers/executivesController.js`
- `Backend/controllers/alumniController.js`
- `Backend/controllers/registrationController.js`
- `Backend/controllers/settingsController.js`

### 7.6 Backend admin implementation

- `Backend/admin/middleware/adminAuth.js`: bearer-token verification
- `Backend/admin/routes/admin.js`: login route
- `Backend/admin/routes/adminRegistrations.js`: protected registration review routes
- `Backend/admin/routes/adminEvents.js`: protected event CRUD
- `Backend/admin/routes/adminPress.js`: protected press CRUD
- `Backend/admin/routes/adminExecutives.js`: protected executive CRUD
- `Backend/admin/routes/adminAlumni.js`: protected alumni CRUD
- `Backend/admin/controllers/adminController.js`: active login logic
- `Backend/admin/controllers/adminRegistrationsController.js`
- `Backend/admin/controllers/adminEventsController.js`
- `Backend/admin/controllers/adminPressController.js`
- `Backend/admin/controllers/adminExecutivesController.js`
- `Backend/admin/controllers/adminAlumniController.js`

### 7.7 Backend compatibility wrappers

- `Backend/routes/admin.js`: re-exports the admin login route from the admin implementation tree
- `Backend/controllers/adminController.js`: re-exports the active admin login controller

These wrappers keep older import paths stable while the real implementation lives under `Backend/admin/`.

### 7.8 Frontend shared files

- `Frontend/components/navbar.js`: injects the navbar and highlights the active page
- `Frontend/components/footer.js`: injects the footer, quick links, contact block, and social links. Facebook is currently wired to a live external URL; LinkedIn and GitHub are still placeholders.
- `Frontend/components/hero.js`: renders shared page hero sections from `data-*` attributes
- `Frontend/js/api.js`: public API helper and image-path resolver
- `Frontend/assets/images/executives/default.svg`: real fallback profile image

### 7.9 Frontend feature files

- `Frontend/js/events.js`
- `Frontend/js/eventDetails.js`
- `Frontend/js/press.js`
- `Frontend/js/executives.js`
- `Frontend/js/alumni.js`
- `Frontend/js/join.js`
- `Frontend/js/checkStatus.js`
- `Frontend/js/stats.js`
- `Frontend/js/particles.js`
- `Frontend/js/terminal.js`
- `Frontend/js/cards/eventCard.js`
- `Frontend/js/cards/pressCard.js`
- `Frontend/js/cards/executiveCard.js`

### 7.10 AdminPanel files

- `AdminPanel/components/sidebar.js`: shared sidebar injector
- `AdminPanel/js/authCheck.js`: client-side token presence check
- `AdminPanel/js/login.js`: login flow
- `AdminPanel/js/adminApi.js`: authenticated admin request helper
- `AdminPanel/js/settingsAdmin.js`
- `AdminPanel/js/registrationsAdmin.js`
- `AdminPanel/js/eventsAdmin.js`
- `AdminPanel/js/pressAdmin.js`
- `AdminPanel/js/executivesAdmin.js`
- `AdminPanel/js/alumniAdmin.js`

## 8. What changed in the consistency fix

The project now behaves more predictably in these areas:

- public collection reads return plain arrays consistently
- admin CRUD routes are protected on the server, not just hidden in the browser
- settings writes require a valid JWT
- executive `department` is aligned across admin UI, backend, and public rendering
- event tags are normalized on both read and write
- profile fallback images point to a real local asset
- upload replacement and deletion clean up old files
- the admin seed script is safe to rerun
- runtime config is centralized and overridable
- stale response-wrapper utilities were removed

## 9. Remaining caveats

These are not broken, but they are worth knowing:

- there are still compatibility routes under `/api/events` and `/api/registration` for older admin-like flows, but they are protected and not used by the public site
- `authCheck.js` only checks for token presence; real enforcement happens in the backend and in `adminApi.js` redirect handling
- there are no automated tests in the repository yet

## 10. Safe change recipes

- To add a field to registrations:
  - update `Frontend/pages/join.html`
  - confirm `Frontend/js/join.js` submits it
  - add it to `Backend/models/Registration.js`
  - persist it in `Backend/controllers/registrationController.js`
  - render it in `AdminPanel/js/registrationsAdmin.js` if admins need it

- To add a field to events:
  - update `AdminPanel/events.html`
  - append it in `AdminPanel/js/eventsAdmin.js`
  - add it to `Backend/models/Event.js`
  - normalize/persist it in the event controllers if needed
  - expose it in `Frontend/js/cards/eventCard.js` if it belongs on the public site

- To change auth:
  - update `Backend/admin/middleware/adminAuth.js`
  - update login token issuance in `Backend/admin/controllers/adminController.js`
  - update client redirect handling in `AdminPanel/js/adminApi.js`

- To change upload behavior:
  - update `Backend/utils/uploadFiles.js`
  - review all admin controllers that call `getUploadedImagePath()` and `removeUploadedFile()`

- To change backend origins or deployment config:
  - update environment variables
  - keep the static sites served over HTTP
  - verify the `API_BASE` logic in `Frontend/js/api.js` and `AdminPanel/js/adminApi.js`
