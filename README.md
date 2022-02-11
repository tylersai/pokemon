This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Welcome to [Pokemon site](https://pokemon-beta-black.vercel.app).

### Setup environment variables
Create `.env.local` file under root directory and copy all properties from `.env` file:<br />
```
POKEMON_API_KEY=<YOUR-POKEMON-TGI-API-KEY>
```
and replace the values accordingly. You can get your own `POKEMON_API_KEY` from [Pokémon TCG Developer Portal](https://dev.pokemontcg.io/).

### Install dependencies:

```bash
npm install --save
# or
yarn install
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Run the production server:

```bash
npm run build
npm start
# or
yarn build
yarn start
```
Since this project is dockerized, you can build and run docker image:
1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t pokemon-site .`
1. Run your container: `docker run -p 5800:80 pokemon-site`

You can view your images created with `docker images`


Open [http://localhost:5800](http://localhost:5800) with your browser to see the result.

## Live Demo

See the live demo deployed on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) here: [https://pokemon-beta-black.vercel.app](https://pokemon-beta-black.vercel.app)
