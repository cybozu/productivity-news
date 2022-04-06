import Head from "next/head";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "../lib/constants";

const Meta = () => {
  return (
    <Head>
      <link rel="icon" href="/favicon/favicon.ico" />
      <link rel="icon" href="/favicon/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />

      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <meta name="theme-color" content="#000" />
      <meta
        name="description"
        content={`A statically generated blog example using Next.js and ${CMS_NAME}.`}
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
};

export default Meta;
