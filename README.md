
# ThorType

This is the static font portfolio website deployed to thortype.com (web2) and thortype.x (web3).

It's made using Next.JS and deployed with the build and export commands.

## Structure

There are two main components of this project
- The site proper:
  This is Next.JS code whereby pages are made with little or no backend calls, fonts are embedded into their respective pages by getting them from the font-list-data.ts and font.ts type definitions.
- Tools
  This is a spring boot Java-project that uses Apache PDFBox/FontBox to extract relevant information from fonts and write them to the font.ts and font-list-data JSON files.
  It also creates the base64-encoded data-uri.

Whenever a font is changed or edited, run the tools application and make a commit, this might be automated in the future.

### Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) as well as icons from [Material](https://www.npmjs.com/package/@mui/material).
Some dynamic styling is used to set the Fonts for the pages and change styling properties in the text preview text field.

## Fonts

Fonts are embedded into the HTML files as mentioned above.
Fonts should be stored as OpenType fonts with a CFFTable so the tools can easily extract information about available glyphs and characters.

## Next.JS information

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
