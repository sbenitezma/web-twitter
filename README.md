# Social Chirp

A small social timeline (Twitter-like) where you can read your timeline,
publish posts and follow or unfollow people.

It started in 2021 as a **technical test built with Vue 2** and was
**migrated to Vue 3 in 2026** as a real-world example of upgrading a legacy
front-end. The original code is kept in the `v1.0.0-vue2` tag.

## Features

- Home timeline with your posts and the posts of the people you follow,
  newest first.
- Publish posts (max. 280 characters, `Ctrl/Cmd + Enter` to send).
- Follow and unfollow users. Changes are saved in your browser.
- User profiles with clean URLs (`/user/pauline`).
- "Reset demo data" option in the user menu.
- Responsive layout: on mobile the timeline comes first.

## Tech stack

| Area          | Vue 2 version (2021)        | Vue 3 version (2026)                 |
| ------------- | --------------------------- | ------------------------------------ |
| Framework     | Vue 2.6 (Options API)       | Vue 3.5 (`<script setup>`, Composition API) |
| Build tool    | Vue CLI 4 + webpack 4       | Vite 7                               |
| State         | Vuex 3                      | Pinia 3                              |
| Router        | Vue Router 3 (hash mode)    | Vue Router 4 (history mode)          |
| UI library    | Vuetify 2                   | Vuetify 3                            |
| Dates         | vue-moment (Moment.js)      | Native `Intl.RelativeTimeFormat`     |
| Unit tests    | Jest 24 + Vue Test Utils 1  | Vitest + Vue Test Utils 2            |
| E2E tests     | Cypress 3 (Vue CLI plugin)  | Cypress 14                           |
| Linting       | ESLint 6 (`.eslintrc`)      | ESLint 9 (flat config) + Prettier 3  |
| Node          | Not pinned                  | 22                                   |

## Migration notes

### What changed and why

- **Vuex → Pinia.** State, mutations, actions and getters now live in one
  "setup store" (`src/stores/social.js`). The old store kept two copies of
  the users (`followingUsers` / `nonFollowingUsers`); now only the followed
  ids are stored and both lists are derived with `computed`, so they can't
  get out of sync.
- **Options API → `<script setup>`.** Components are shorter and logic is
  reusable through composables (`useNow`).
- **Presentational components.** `UserList` no longer talks to the store, it
  emits `follow` / `unfollow` events. This makes it reusable and easy to test.
- **Moment.js removed.** Moment is in maintenance mode and adds weight to the
  bundle. `src/utils/relativeTime.js` uses the browser's native API instead.
- **`v-virtual-scroll` removed.** The data set is small, so a plain list is
  simpler and more accessible.
- **Hash URLs → clean URLs.** `netlify.toml` adds the SPA redirect so
  reloading `/user/pauline` works.
- **Single `SocialArea`.** The old layout rendered it twice and hid one copy
  per breakpoint; now there is one instance and CSS changes the order.

### Component mapping

| Vue 2               | Vue 3                                   |
| ------------------- | --------------------------------------- |
| `Navbar`            | `AppNavbar`                             |
| `Post`              | `PostComposer`                          |
| `Timeline`          | `UserTimeline` + `PostItem`             |
| `Profile`           | `UserProfileHeader`                     |
| `SocialArea`        | `SocialArea`                            |
| `UserList`          | `UserList`                              |
| `ProgressCircular`  | Vuetify `v-skeleton-loader`             |

Component names now have two words, following the
[Vue style guide](https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names).

### Bugs fixed during the migration

- Empty posts could be published.
- The textarea wasn't cleared after publishing.
- All changes were lost after reloading the page.
- Opening an unknown user (`/user/ghost`) broke the page.
- Author names were rendered with `v-html`, which allowed HTML injection (XSS).
- A getter sorted the posts array in place, mutating the store state.
- E2E tests depended on the current date ("a month ago") and broke over time.

## Getting started

Requirements: Node 22 (see `.nvmrc`).

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:5173
```

## Scripts

| Command                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Development server with hot reload           |
| `npm run build`         | Production build in `dist/`                  |
| `npm run preview`       | Serve the production build locally           |
| `npm run test:unit`     | Run unit tests once                          |
| `npm test`              | Run unit tests in watch mode                 |
| `npm run test:coverage` | Unit tests with coverage report              |
| `npm run test:e2e`      | Build, serve and run Cypress E2E tests       |
| `npm run cypress:open`  | Open the Cypress UI (needs `npm run preview`) |
| `npm run lint`          | Check code quality with ESLint               |
| `npm run format`        | Format code with Prettier                    |

## Project structure

```
src/
├── api/db/user.json      # Mock API data
├── assets/styles/        # Global styles
├── components/           # Reusable components
├── composables/          # Reusable Composition API logic
├── plugins/vuetify.js    # Vuetify setup and brand colors
├── router/               # Routes
├── stores/social.js      # Pinia store
├── utils/                # Pure helper functions
└── views/                # One component per route
tests/unit/               # Vitest unit tests
cypress/e2e/              # Cypress end-to-end tests
```

## Deployment

Deployed on Netlify. The build settings live in `netlify.toml`, so no extra
configuration is needed in the Netlify dashboard.

## Author

Made by [Sonia Benítez](https://github.com/sbenitezma).
