import Link from 'next/link'

type Props = {
  title: string
  excerpt: string
  year: string
  slug: string
}

const PostPreview = ({
  title,
  excerpt,
  year,
  slug,
}: Props) => {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${year}/${slug}`} href="/posts/[year]/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}

export default PostPreview
