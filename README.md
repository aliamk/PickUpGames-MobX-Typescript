# PickUp games

## A social networking app made for sports enthusiasts who want like-minded users to play against  
### Users can create game posts, edit and filter them, join games, upload photos and chat with other users
### Made with .Net Core on the backend, react on the frontend with CRUD functionality for communicating between the two
---

*.Net Core - react - typescript - MobX - Entity Framework - SqLite/MySql/SqlServer - Semantic-UI*

![ASP.NET Core logo](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/35px-.NET_Core_Logo.svg.png)&nbsp;&nbsp;**.NET Core:** A framework for building a variety of apps that's liked for it's speed, versatility and scalability

![react logo](https://img.icons8.com/plasticine/40/000000/react.png)&nbsp;&nbsp;**react:**  A library that allows declarative programming with reusable components and uni-directional data flow

![typescript](https://img.icons8.com/color/40/000000/typescript.png)&nbsp;&nbsp;**typescript:**  A language that lets you strongly-type Javascript so you can keep track of your data-types and use the latest features of Javascript

![MobX logo](https://api.iconify.design/logos-mobx.svg?height=30)&nbsp;&nbsp;**MobX:**  A library that helps simplify components by moving state from local to central - make components 'observers' of state in stores using react 'context'

![Entity Framework](https://img.icons8.com/nolan/40/data-configuration.png)&nbsp;&nbsp;**Entity Framework:**  An Object-Relational Mapper that lets you communicate with a SQL database without having to use SQL queries

![SQL](https://img.icons8.com/nolan/45/sql.png)&nbsp;&nbsp;**SQL:**  Used SqLite in development for seeding data and swapped it out for MySql and SqlServer at deployment

![Semantic-UI](https://api.iconify.design/logos-semantic-ui.svg?height=35)&nbsp;&nbsp;**Semantic-UI:**  An easy to use style/theme framework with ready-to-use components and makes responsive layout easier to build


---

### Overview of App

### Logging-in and out as a previously registered user with client-side form validation
![lazyloading](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/1.log_in_bob.gif)


### Alternatively, facebook users can log-in via the second button (facebook issues an access token which this app verifies by sending it back to facebook and then generates a JWT token to the facebook user)
![facebook login](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/2.facebook_login.gif)


### A logged-in user can return to the site without logging-in again because persistence has been added by sending data to the server.  Once in, a user can create a game - this form also has client-side validation
![lazyloading](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/3.login_persistence_create_game.gif)


### Only the creator of a game can then edit it - the Manage button only appears if the user is also the creator
![lazyloading](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/4.Edit_game_add_comment.gif)


### A user can look up a game and join - multiple users can add messages in the chat box under every game (SignalR)
![lazyloading](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/5.chat_widget.gif)


### All games are filterable by date or by a user looking at games they've created, or going to, or all games (no filter)
![lazyloading](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/6.filter.gif)


### The registration form has client-side validation and generates an email verification for the user
![user registration](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/7.register_user.gif)


### User can't log-in without first clicking the verification link in the email
![verification failed](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/email_verification_failed.gif)


### This is the page users are sent to when they click the email verification link
![email verified](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/Email_verified.png)


### Users can then log-in and add a profile picture
![profile picture](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/8.add_photos.gif)

---

#### Facebook is currently not verifying apps with individual status in the dev portal due to covid so for now, only the test user I've created in the portal can login via Facebook - after covid, potentially any facebook user should be able to log-in
![facebook app verified](https://github.com/aliamk/PickUpGames/blob/main/ReadMe_assets/verification_pause.png)

---

Installed packages:
1. npx create-react-app client-app --use-npm --typescript
1. npm install semantic-ui-react
1. npm install uuid 
1. npm install @types/uuid  
1. npm install mobx mobx-react-lite
1. npm install react-router-dom 
1. npm install @types/react-router-dom 
1. npm install react-toastify
1. npm install react-final-form final-form
1. npm install react-widgets react-widgets-date-fns date-fns
1. npm install @types/react-widgets
1. npm install react-dropzone
1. npm install @microsoft/signalr
1. npm install @types/react-infinite-scroller
1. npm install query-string
1. npm install react-facebook-login @types/react-facebook-login