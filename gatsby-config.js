module.exports = {
  siteMetadata: {
    title: `Google Sheets POC`,
    description: `Proof of concept using Google Sheets with Gatsby`,
    author: `Reuben Berghan`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: '14yrj2sQXSBTeY_G_p-kieHHXMH3qy212HACNPdTC4dI',
        worksheetTitle: 'questions',
        credentials: require('./.env/google-sheets-poc-6d42e1967586.json')
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}
