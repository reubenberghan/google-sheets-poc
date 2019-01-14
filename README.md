# Google Sheets with Gatsby Proof of Concept

This project is intended to explore the viablility of using Gatbsy to serve a static site where the data can be managed using a Google Sheet.

The project uses Netlify for hosting and continuous delivery.

See a demo of the deployed [Production site](https://hungry-raman-79bda9.netlify.com/).

## Tech

- Gatsby
- React (with Hooks)
- gatsby-source-google-sheets

## Prerequisites

You will need to create an example Google Sheet in Google Drive and a service account in the Google API Console (to set up the necessary credentials for the Gatsby plugin to pull the data from your Google Sheet).

## To use

Add the `gatsby-cli` globally by running.

```
yarn global add gatsby-cli
```

Clone this repo into your local workspace.

