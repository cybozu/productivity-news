import Head from "next/head";
import {
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_TWITTER_CARD_URL,
} from "../lib/constants";
import { pathFor } from "../lib/utils";

const Meta = () => {
  return (
    <Head>
      <link rel="icon" href={pathFor("/favicon/favicon.ico")} />
      <link
        rel="icon"
        href={pathFor("/favicon/icon.svg")}
        type="image/svg+xml"
      />
      <link
        rel="apple-touch-icon"
        href={pathFor("/favicon/apple-touch-icon.png")}
      />
      <link rel="manifest" href={pathFor("/favicon/site.webmanifest")} />

      <meta name="theme-color" content="#000" />
      <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
      <meta name="twitter:image" content={DEFAULT_TWITTER_CARD_URL} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Meta;
