# Project Name

For visualisation of how it all works see the theory.png file in images directory

## Technologies Used

- **Bundler**: Vite
- **Main Framework**: React
- **Css Library**: Tailwind Css with postcss

## Run the project

```bash
  npm run dev
```

## Build the project

```bash
  npm run build
```

## Hosting
hosting with firebase: https://graph-algorithms-visualisation.web.app/

## Deploy:
When files in the public directory
```bash
  firebase deploy
```

## Naming comvetion:
Theres several graph types with shorter and longer names, so to keep it rather shorter each of them has a shortcut name:
 - M - matrix graph
 - D - directed graph
 - DW - directed weighted graph
 - U - undirected graph
 - UW - undirected weighted graph
 - E - edge graph (with edges) - not a matrix graph (including: D, DW, U, UW)