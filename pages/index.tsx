import Head from "next/head";
import Container from "../components/container";
import Stories from "../components/stories";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Post from "../types/post";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const posts = allPosts;
  const title = "Cybozu Productivity News";

  return (
    <>
      <Layout>
        <Head>
          <title>{title}</title>
          <meta name="og:title" content={title} />
        </Head>
        <Container>
          <Intro />
          {posts.length > 0 && <Stories posts={posts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "year", "slug", "excerpt"]);

  return {
    props: { allPosts },
  };
};
