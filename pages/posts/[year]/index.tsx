import Container from "../../../components/container";
import Intro from "../../../components/intro";
import Layout from "../../../components/layout";
import { getAllYears, getPostsByYear } from "../../../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../../../lib/constants";
import Post from "../../../types/post";
import Stories from "../../../components/stories";

type Props = {
  posts: Post[];
};

const Index = ({ posts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
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

type Params = {
  params: {
    year: string;
  };
};

export const getStaticProps = async ({ params: { year } }: Params) => {
  const posts = getPostsByYear(year, ["title", "year", "slug", "excerpt"]);

  return {
    props: { posts: posts },
  };
};

export async function getStaticPaths() {
  const years = getAllYears();
  return {
    paths: years.map((year) => `/posts/${year}`),
    fallback: false,
  };
}
