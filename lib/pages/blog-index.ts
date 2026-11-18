import { blogPosts } from "./blog";
export { blogPosts };
export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const formatDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
