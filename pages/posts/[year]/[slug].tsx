import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../../../components/container";
import PostBody from "../../../components/post-body";
import Header from "../../../components/header";
import PostHeader from "../../../components/post-header";
import Layout from "../../../components/layout";
import { getPostBySlug, getAllPosts } from "../../../lib/api";
import PostTitle from "../../../components/post-title";
import markdownToHtml from "../../../lib/markdownToHtml";
import PostType from "../../../types/post";
import { DEFAULT_OG_IMAGE_URL } from "../../../lib/constants";

type Props = {
  post: PostType;
  preview?: boolean;
};

const Post = ({ post, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const title = `${post.title} | Cybozu Productivity News`;

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta name="og:title" content={title} />
              </Head>
              <PostHeader title={post.title} />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    year: string;
    slug: string;
  };
};

export async function getStaticProps({ params: { year, slug } }: Params) {
  const post = getPostBySlug(year, slug, ["title", "year", "slug", "content"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["year", "slug"]);

  return {
    paths: posts.map(({ year, slug }) => {
      return { params: { year, slug } };
    }),
    fallback: false,
  };
}
