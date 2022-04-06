import fs from "fs";
import { basename, dirname, extname, join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export const getPostBySlug = (
  year: string,
  date: string,
  fields: string[] = []
) => {
  const fullPath = join(year, `${date}.md`);

  return getPostByPath(fullPath, fields);
};

export const getAllPosts = (fields: string[] = []) => {
  const years = getAllYears();
  return years.map((year) => getPostsByYear(year, fields)).flat();
};

export const getAllYears = () => {
  const years = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((f) => f.isDirectory());

  return years.map((year) => year.name);
};

export const getPostsByYear = (year: string, fields: string[] = []) => {
  const markdownFiles = fs
    .readdirSync(join(postsDirectory, year), { withFileTypes: true })
    .filter((file) => file.isFile() && extname(file.name) === ".md");
  const paths = markdownFiles.map((file) => join(year, file.name));

  return paths.map((filePath) => getPostByPath(filePath, fields));
};

const getPostByPath = (filePath: string, fields: string[] = []) => {
  const fileContents = fs.readFileSync(join(postsDirectory, filePath), "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "year") {
      items[field] = dirname(filePath);
    }
    if (field === "slug") {
      items[field] = basename(filePath, ".md");
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
};
