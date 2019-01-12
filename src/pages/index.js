import * as React from 'react'

import { filter, map, not, pipe } from 'ramda'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'

const mapQuestions = pipe(
  filter(({ node: { archived } = {} }) => not(archived)),
  map(({ node: { body, id, topic } = {} }) => <li key={id}>{topic}: {body}</li>)
)

export default ({ data }) => {
  const { allGoogleSheetQuestionsRow: { edges } = {} } = data

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Questions by topic</h1>
      <ol>
        {mapQuestions(edges)}
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
          archived
        }
      }
    }
  }
`
