import { posts } from "#site/content";

export type Post = (typeof posts)[number];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slugAsParams === slug);
}

export function getAllTags(): Record<string, number> {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });
  return tags;
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
