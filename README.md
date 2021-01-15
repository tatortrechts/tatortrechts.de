# `tatortrechts.de`

Backend: <https://github.com/rechtegewalt/api.tatortrechts.de>
Data Wrangling: <https://github.com/rechtegewalt/data.tatortrechts.de>

## Dev

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

Create a file `.env.local` with:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=XX
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Depedencies

Don't update `react-map-gl` to v6 because it includes the non-open-source version of the new `mapbox-gl-js`: <https://github.com/visgl/react-map-gl/releases/tag/v6.0.0>

## Production

Right now: Confused about `MAPBOX_TOKEN` vs `NEXT_PUBLIC_MAPBOX_TOKEN`

```bash
MAPBOX_TOKEN:              XX
NEXT_PUBLIC_MAPBOX_TOKEN:  XX
NEXT_TELEMETRY_DISABLED:   1
```

## License

Affero General Public License 3.0
