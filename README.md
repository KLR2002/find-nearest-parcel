# Find Nearest Parcel

## Author

- **Name:** Krzysztof Lasecki
- **Email:** krzysztoflasecki02@gmail.com

## Overview

find-nearest-parcel is simple web app I built for InPost recruitment assignment.

App have two main functions:

- User can type their address to get list of nearest parcels
- Or provide their current localization (permission is necessery)

Application is using coordinates (latitude and longitude) to search for nearest parcel points. If user provides address, coordinates are fetched from [OpenStreetMap API](https://nominatim.openstreetmap.org/ui/search.html)

I chose this kind of app because it's useful information that probably many users with access to that kind of api wants to know.

I deployed this app on Deno Deploy platform, so you can check project by [clicking this link](https://find-nearest-parcel.klr2002.deno.net).

I decided to deploy because I'm aware that Deno is not as popular runtime as it should be. 

## Technologies

I decided to make this app in JavaScript with React because i feel comfortable while writing apps using this library in terms of experience and knowledge. 

I'm also using my favorite frameworks/libraries:

- ChakraUI for nice and clean look
- Tanstack Query to handle asynchronous operations
- Hono for simple and fast handling backend server

## How to run

### Prerequisites

- Install [Node](https://nodejs.org/en)
- Install [Deno](https://deno.com)

### Build & run
```bash
git clone https://github.com/KLR2002/find-nearest-parcel.git
cd .\find-nearest-parcel\
deno install
deno run dev
```

App should be running on localhost:5174

## What I would do with more time

Add more functions, e.g filter by other features, integrated map, better interface and better entries description. 

## AI usage

I'm using Gemini, but i'm using AI mainly for research purposes as alternative to checking documentation rather than copy & pasting + i'm always veryfing what AI says.

## Anything else?

--

