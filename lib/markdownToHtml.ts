import fromMarkdown from "remark-parse";
import withGfm from "remark-gfm";
import withBreaks from "remark-breaks";
import { unified } from "unified";
import toHtml from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(fromMarkdown)
    .use(withGfm, { singleTilde: false })
    .use(withBreaks)
    .use(toHtml, { sanitize: false })
    .process(markdown);
  return result.toString();
}
