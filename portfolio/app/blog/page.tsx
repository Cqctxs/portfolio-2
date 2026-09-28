import type { Metadata } from "next";
import BlogApp from "./BlogApp";

export const metadata: Metadata = {
  title: "Blog - CactusOS",
  description: "Writing by Sean Zhao",
};

export default function BlogPage() {
  return <BlogApp />;
}
