import api from "../src/services/api";
import { prisma } from "../src/services/prisma";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://somnotalo.com",
  }[process.env.NODE_ENV];

  const staticPages = [
    `${baseUrl}/explorar`,
    `${baseUrl}/novidades`,
    `${baseUrl}/politica-de-privacidade`,
    `${baseUrl}/protecao-propriedade-intelectual`,
  ];

  const formatDate = (date) => {
    return new Date(date).toISOString();
  };

  const albums = await prisma.album.findMany({
    select: { slug: true, updatedAt: true },
  });

  const artists = await prisma.artist.findMany({
    select: { slug: true, createdAt: true },
  });

  const dynamicPages = [
    ...albums.map((album) => ({
      url: `albums/${album.slug}`,
      updatedAt: formatDate(album.updatedAt),
    })),
    ...artists.map((artist) => ({
      url: `artistas/${artist.slug}`,
      updatedAt: formatDate(artist.createdAt),
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
      ${dynamicPages
        .map(({ url, updatedAt }) => {
          return `
              <url>
                <loc>${baseUrl}/${url}</loc>
                <lastmod>${updatedAt}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
        })
        .join("")}
    </urlset>
  `;
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
