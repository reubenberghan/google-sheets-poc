# Google Sheets with Gatsby Proof of Concept

This project is intended to explore the viablility of using Gatbsy to serve a static site where the data can be managed using a Google Sheet.

The project uses Netlify for hosting and continuous delivery.

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
3. In the API library search for the "Google Drive API" click on it and then select the Enable button.
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

## Set up Netlify

Before doing this you'll need to make sure you've set up and pushed the code to a remote repo on GitHub (or other git provider).

If you don't already have an account with [Netlify](https://www.netlify.com/) you can sign up for free and [create a new site from git](https://app.netlify.com/start).

This will run you through the steps setup the site on Netlify. Once you've selected the your git provider and the repo in the final step click the "Show advanced" button to be able to add the environment variables from above into the build settings. The other options on this page allow you to control how the continuous deployment work with Netlify but these get defaulted and don't need to be changed.

After adding the environment variables click "Deploy site" Netlify will build and deploy your site.

## Triggering a rebuild with Zapier

With the Google Sheet set up and the site deployed using Netlify the next step is to trigger a rebuild and deploy of the site. To do this we can use [Zapier](https://zapier.com/) which has integrations to be able to listen for changes to the Google Sheet and in turn trigger a deploy in Netlify.

Once you've signed up with Zapier you'll need to "Make a Zap!" where you'll need to add a name for it and then search for Google Sheets as the "Trigger App". Next you choose the "Trigger" which will be "New or Updated Spreadsheet Row" and then connect your Google account and add the required Google Sheet details.

Next you'll need to "Add a step" where you can search for Netlify as the "Action App" and use "Start Deploy" as the action. Again you will need to connect your account (for Netlify this time) and then the site which you want the action to deploy.

Once this has been set up and switched on you should now be able to make changes in the Google Sheet containing the data for the site and check the task history to see the Zap being fired redeploying the site on Netlify. The deployment process rebuilds the site where the Gatsby plugin will go and pull the latest data from the Google Sheet to populate the new build.
