import PostPreview from './post-preview'
import Post from '../types/post'

type Props = {
  posts: Post[]
}

const Stories = ({ posts }: Props) => {
  return (
    <section>
      <div className="grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            year={post.year}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}

export default Stories
