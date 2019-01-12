import * as React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import { map } from 'ramda'

export default ({ data }) => {
  const { allGoogleSheetQuestionsRow: { edges } = {} } = data

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Questions by topic</h1>
      <ol>
        {map(({ node: { body, id, topic } = {} }) => <li key={id}>{topic}: {body}</li>, edges)}
      </ol>
    </Layout>
  )
}

export const query = graphql`
  query {
    allGoogleSheetQuestionsRow {
      edges {
        node {
          id
          body
          topic
        }
      }
    }
  }
`
