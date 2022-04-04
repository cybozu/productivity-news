import PostTitle from './post-title'

type Props = {
  title: string
}

const PostHeader = ({ title }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
    </>
  )
}

export default PostHeader
