# Find Nearest Parcel

find-nearest-parcel is simple web app i built for InPost recruitment assignment.

App have two main functions:

- User can type their address to get list of nearest parcels
- Or provide their current localization (permission is necessery)

I chose this kind of app because it's useful information that probably many users with access to that kind of api wants to know.

## Technical decisions

I decided to make this app in JavaScript with React because i feel comfortable while writing apps using this library in terms of experience and knowledge. 

I'm also using my favorite frameworks/libraries:

- ChakraUI for nice and clean look
- Tanstack Query to handle asynchronous operations
- Hono for simple and fast handling backend server

## Check out app

I deployed this app on Deno Deploy platform, so you can check project by [clicking this link](https://find-nearest-parcel.klr2002.deno.net).

I decided to deploy because I'm aware that Deno is not as popular runtime as it should be. If you want to run this app on your machine:

- install [Deno](https://deno.com)
- In root catalog execute:
    - ```deno install```
    - ```deno run dev```
- App should ran on localhost:5174
