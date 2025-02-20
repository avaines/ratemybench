# Visit [ratemybench.vaines.org](https://ratemybench.vaines.org) to rate some benches

## A basic web page and a simple cloudflare worker API

This repository contains the source code for a very simple website hosted on **Cloudflare Pages** (frontend) and a **Cloudflare Worker** (backend). The frontend is built in **React**, and the backend acts as a CRUD API for a Cloudflare KV store with bench data.


### Frontend (Cloudflare Pages)

The frontend is a simple react site hosted on **Cloudflare Pages**. Content is in the `frontend/` directory.

### Backend (Cloudflare Worker)

The backend is a **Cloudflare Worker** that acts as a CRUD API for a **Cloudflare KV** to manage bench data.

## Deployment

### Prerequisites

- **Node.js** (v20 or later)
- **npm** (Node package manager)
- **Wrangler**: Install using `npm install wrangler --save-dev`


### Environment Variables

This project uses environment variables for sensitive data like API tokens. You'll need to set the following environment variables in a `.env` file for local development, or configure them as **GitHub Secrets** for deployment.

| Variable Name              | Description                          |
|----------------------------|--------------------------------------|
| `AUTH_TOKEN`               | Backend simple token to obfuscate direct access  |
| `VITE_GOOGLE_MAPS_API_KEY` | Frontend API key for Google Maps     |


#### Deployment Stages

#### To Deploy Frontend

**Frontend**
```bash
    cd frontend
    npm build
    npm deploy
```

**Backend**
  - Create a new KV store
```bash
    cd backend
    vi wrangler.toml # update the KV bindings with your KV store namespace ID
    cp 'example .dev.vars' .dev.vars
    vi .dev.vars # Now update the SQUARE_ACCESS_TOKEN & LOCATION_ID environmental variables you details
    npx wrangler login
    npx wrangler dev # will run the function in a local execution environment
    npx wrangler deploy # will deploy the worker to the cloudflare
```
    - Populate AUTH_TOKEN environmental variable
    - Set up the integration with Github for it to just keep deploying as you make changes.
