import { Link } from 'next-view-transitions';

import { PostCard } from '../../../components/post-card'
import { getPosts, getTags } from '../../get-posts'

export async function generateMetadata(props) {
  const params = await props.params
  return {
    title: decodeURIComponent(params.tag)
  }
}

export async function generateStaticParams() {
  const allTags = await getTags()
  return [...new Set(allTags)].map(tag => ({ tag: (tag).replace(" ", "%20") }))
}

export default async function TagPage(props) {
  const params = await props.params
  const { title } = await generateMetadata({ params })
  const posts = await getPosts()
  return (
    <div data-pagefind-ignore="all">
      <div className="not-prose uppercase text-xs font-bold">
        <Link
          className="transition-colors no-underline font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-white"
          href="/"
        >
          All posts
        </Link>
        <span className="text-gray-400 dark:text-gray-500 inline-block mx-1">
          &rsaquo;
        </span>
      </div>
      <h1 className='mt-4'>{title}</h1>
      {posts
        .filter(post =>
          post.frontMatter.tags.includes(decodeURIComponent(params.tag))
        )
        .map(post => (
          <PostCard key={post.route} post={post} />
        ))}
    </div>
  )
}
