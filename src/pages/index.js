import * as React from 'react'

import { graphql } from 'gatsby'
import { filter, map, not, pipe } from 'ramda'

import Layout from '../components/layout'
import SEO from '../components/seo'

const { useState } = React

const mapQuestions = pipe(
  filter(({ node: { archived } = {} }) => not(archived)),
  map(({ node: { body, id, topic } = {} }) => <li key={id}>{topic}: {body}</li>)
)

export default ({ data }) => {
  const [submitted, setSubmitted] = useState(false)

  const { allGoogleSheetQuestionsRow: { edges } = {} } = data

  return (
    <Layout>
      <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
      <h1>Questions by topic</h1>
      {not(submitted) && <ol>
        {mapQuestions(edges)}
      </ol>}
      <button onClick={() => setSubmitted(not(submitted))}>Submit...</button>
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
