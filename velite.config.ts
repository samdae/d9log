import { defineConfig, defineCollection, s } from 'velite'

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
    rehypePlugins: [],
    remarkPlugins: []
  }
})
