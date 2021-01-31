# `tatortrechts.de`

Checkout the other repos:

- [Backend: api.tatortrechts.de](https://github.com/tatortrechts/api.tatortrechts.de)
- [Data Wrangling: data.tatortrechts.de](https://github.com/tatortrechts/data.tatortrechts.de)

## Development

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

Open <http://localhost:3000> with your browser to see the result.

You can start editing the page by modifying `pages/index.js`.
The page auto-updates as you edit the file.

### Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js/)

### Depedencies

Don't updgrade:

- `ky` and `ky-universal` (there problems with how next.js's wepback config)
- `react-map-gl` (v6 requires `mapbox-gl-js` v2 which is [not open source anymore](https://github.com/visgl/react-map-gl/releases/tag/v6.0.0), `react-map-gl` v5.3 adds backwards-incometable changes and this breaks everything)
- `@date-io/dayjs` (there were some erros with v2, can't recall details)

## Production

Right now: Confused about `MAPBOX_TOKEN` vs `NEXT_PUBLIC_MAPBOX_TOKEN`

```bash
MAPBOX_TOKEN:              XX
NEXT_PUBLIC_MAPBOX_TOKEN:  XX
NEXT_TELEMETRY_DISABLED:   1
```

## License

Affero General Public License 3.0
