# RicardoTech Portfolio Frontend

React one-page portfolio deployed as a static build to the private S3 bucket behind CloudFront.

## Local development

```bash
npm ci
cp .env.example .env.local
npm start
```

The default API target is `https://api.ricardotech.com`. For local backend testing, change only your local `.env.local` file.

## Production build

```bash
npm ci
CI=false GENERATE_SOURCEMAP=false npm run build
```

Upload the `build/` folder to `s3://ricardotech-frontend-prod` and invalidate CloudFront distribution `E22UETPZ8WB2H8`.

## Structure

- `src/data/portfolioContent.js` keeps reusable portfolio writing and links.
- `src/sections/` contains the one-page portfolio sections.
- `src/components/` contains feature panels and shared UI.
- `src/services/apiClient.js` centralizes API requests.
