# Google Sheets with Gatsby Proof of Concept

This project is intended to explore the viablility of using Gatbsy to serve a static site where the data can be managed using a Google Sheet.

The project uses Netlify for hosting and continuous delivery.

See a demo of the deployed [Production site](https://hungry-raman-79bda9.netlify.com/).

## Tech

- Gatsby
- React (with Hooks)
- gatsby-source-google-sheets

## To get Gatsby and this repo set up locally

If you don't already add `gatsby-cli` globally by running.

```bash
yarn global add gatsby-cli
```

Run the following to set this repo up in your local workspace directory.

```bash
gatsby new google-sheets-poc https://github.com/reubenberghan/google-sheets-poc
```

## Google Sheets setup

You will need to create an example Google Sheet in [Google Drive](https://drive.google.com/) and a service account in the [Google API Console](https://console.developers.google.com/). The Google Sheet will serve as the data source for the Gatsby site and and the service account will provide the necessary credentials for the Gatsby plugin to pull the data from your Google Sheet.

The plugin will use the column names as the fields in the exposed GraphQL API and convert them to camelCase. The current query in the POC expects the following fields (columns in the spreadsheet):
- body
- topic
- archived

Once you get up and going you could experiment with these to get a better understanding but initially this will be enough.

In the [Google API Console](https://console.developers.google.com/) follow these steps to set up a [Service Account](https://cloud.google.com/iam/docs/understanding-service-accounts) (which is basically a Google account for the application)

1. Create a new project.
2. In the APIs & Services Dashboard page select the Enable API and Services button at the top.
3. In the PAI library search for the "Google Drive API" click on it and then select the Enable button.
4. In the APIs & Services Credentials page click the Create Credentials dropdown and select the Service account key option.
5. Give your new service account a name e.g. `google-sheets-poc-client` and select the Role of Project > Editor.
6. Upon creation this will generate a JSON file containing necessary credentials for your new service account to access the Google Sheet.

Keep the JSON file safe and below we will use some of the values in this file as environment variables in the Gatsby config (don't leave it in your project folder unless it has been excluded in the `.gitignore`).

## Add the environment variables to the project

Next in your project root create the `.env` file and add the following key value pairs (from the JSON file downloaded above):

```
PRIVATE_KEY=<private_key>
PRIVATE_KEY_ID=<private_key_id>
PROJECT_ID=<project_id>
CLIENT_EMAIL=<client_email>
```

You'll notice in the `gatsby-config.js` file we require a `dotenv` package which pulls these values out of the `.env` file and places them as properties on the `process.env` object. You'll also notice in the `gatsby-config.js` a simple utility `makeCredentials` which recreates the credentials object that we saw in the JSON file.

You should now be able to run `gatsby develop` in the terminal and see the development environment build and run (with hot-reloading) at `localhost:8000`.