// velite.config.ts
import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'

// Post Collection Schema
const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s.object({
    slug: s.path(),
    title: s.string().max(99),
    date: s.isodate(), // YYYY-MM-DD
    description: s.string().optional(),
    tags: s.array(s.string()).default([]),
    logId: s.string().optional(), // 컨셉용 ID
    body: s.mdx(),
    toc: s.toc(), // Table of Contents
  })
  .transform(data => ({
    ...data,
    slugAsParams: data.slug.split('/').slice(1).join('/'),
  }))
})

// Rehype Pretty Code Options
const prettyCodeOptions = {
  theme: {
    dark: 'one-dark-pro',
    light: 'github-light',
  },
  keepBackground: true,
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('line-highlighted')
  },
}

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    posts
  },
  mdx: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    remarkPlugins: []
  }
})
