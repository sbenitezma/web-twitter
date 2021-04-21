# web-twitter

> This is an application Based on Vuejs 2.6 Front-end Framework.

## Purpose

The goal of this project is to implement a web-based social networking application (similar to Twitter) satisfying the scenarios below:
- View the current user Timeline
- View a user's timeline
- Post a message
- Follow a new user
- Unfollow a following user

## Main Packages
* Vue-cli
* Vuetify
* Vuex
* Jest
* Cypress
* Sass
* MDI Icons
* Momentjs  
* Eslint


## Components

The components created for this application are the following:

- Navbar
- Post
- Profile
- ProgressCircular
- SocialArea
- Timeline
- UserList

### Navbar
Component to display user info on the navbar
````
## Data

| Name        | Type    | Description | Initial value                    |
| ----------- | ------- | ----------- | -------------------------------- |
| `menuItems` | `array` |             | `[{ title: "Home", path: "/" }]` |
````

### Post
Component to post a tweet on the user timeline
````
## Data

| Name    | Type     | Description | Initial value |
| ------- | -------- | ----------- | ------------- |
| `tweet` | `string` |             | `""`          |

## Methods

### postTweet()
Post new tweet
````

### Profile
Component to display main header of the user profile
````
## Props

| Name              | Type     | Description |
| ----------------- | -------- | ----------- |
| `user` *required* | `Object` | &nbsp;      |
````

### ProgressCircular
Component to display progress circular on different areas according loading section
````
## Props

| Name                 | Type      | Description | Default     |
| -------------------- | --------- | ----------- | ----------- |
| `v-model` *required* | `Boolean` |             | `false`     |
| `size`               | `String`  |             | `"50"`      |
| `color`              | `String`  |             | `"primary"` |

````

###SocialArea
Component to display the followers and unfollowers section

###Timeline
Component to display the timeline of a user
````
## Props

| Name                | Type     | Description |
| ------------------- | -------- | ----------- |
| `height` *required* | `String` |             |
| `posts` *required*  | `Array`  |             |
| `user` *required*   | `Object` | &nbsp;      |

## Data

| Name      | Type     | Description | Initial value |
| --------- | -------- | ----------- | ------------- |
| `benched` | `number` |             | `0`           |

## Methods

### tellTime()
````
###UserList
Component to display the list of users (unfollowers/followers)
````
## Props

| Name               | Type     | Description |
| ------------------ | -------- | ----------- |
| `users` *required* | `Array`  |             |
| `type` *required*  | `String` | &nbsp;      |

## Data

| Name      | Type     | Description | Initial value |
| --------- | -------- | ----------- | ------------- |
| `benched` | `number` |             | `0`           |

## Methods

### followUser()

Set follow user

### unfollowUser()

Set unfollower user

````

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Test Coverage

### Unit (Jest)
````
 PASS  tests/unit/getters.spec.js
 PASS  tests/unit/actions.spec.js
 PASS  tests/unit/Navbar.spec.js
 PASS  tests/unit/Post.spec.js
 PASS  tests/unit/ProgressCircular.spec.js
 PASS  tests/unit/SocialArea.spec.js
 PASS  tests/unit/UserList.spec.js
-----------------|----------|----------|----------|----------|-------------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------|----------|----------|----------|----------|-------------------|
All files        |    82.93 |     37.5 |       75 |    82.05 |                   |
 components      |    76.92 |      100 |       50 |    76.92 |                   |
  Navbar.vue     |      100 |      100 |      100 |      100 |                   |
  Post.vue       |       75 |      100 |       50 |       75 |                58 |
  SocialArea.vue |      100 |      100 |      100 |      100 |                   |
  UserList.vue   |    33.33 |      100 |    33.33 |    33.33 |             91,98 |
 store           |    85.71 |     37.5 |    85.71 |    84.62 |                   |
  actions.js     |    83.33 |       50 |       75 |    83.33 |             44,45 |
  getters.js     |     87.5 |    33.33 |       90 |    85.71 |             30,31 |
-----------------|----------|----------|----------|----------|-------------------|

Test Suites: 7 passed, 7 total
Tests:       16 passed, 16 total
Snapshots:   1 passed, 1 total
Time:        6.184s, estimated 14s
Ran all test suites.

````

### E2E (Cypress)
````
       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  index.spec.js                            00:05        5        5        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  post.spec.js                             00:04        2        2        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  user.spec.js                             00:08        9        9        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        00:18       16       16        -        -        -  

````
