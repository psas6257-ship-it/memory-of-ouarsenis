import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { books } from "@/data/content";

const BASE_URL = "https://memory-of-ouarsenis.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/about", "/privacy", "/terms", "/contact", "/login", "/register"];
        const dyn = books.map((b) => `/book/${b.id}`);
        const urls = [...paths, ...dyn].map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
