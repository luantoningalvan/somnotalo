import React, { useCallback, useRef, useState } from "react";
import { AlbumCard } from "../../components/AlbumCard";
import { Grid } from "@chakra-ui/react";
import PageContent from "../../components/Template/PageContent";
import NoContent from "../../components/NoContent";
import api from "../../services/api";

const grid = {
  base: "repeat(2, 1fr)",
  md: "repeat(3, 1fr)",
  lg: "repeat(4, 1fr)",
  xl: "repeat(6, 1fr)",
};

export interface AlbumsProps {
  initialData: {
    albums: any[];
    hasMore: boolean;
    nextCursor: number;
  };
}

const Albums = ({ initialData }: AlbumsProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const observer = useRef(null);

  const getAlbums = useCallback(async () => {
    setLoading(true);
    const result = await api.get("/albums", {
      params: { cursor: data.nextCursor },
    });
    const paginationCursor = result.headers["x-pagination-cursor"];
    const hasMore = !!paginationCursor && paginationCursor !== "undefined";

    setData((curr) => ({
      albums: [...curr.albums, ...result.data],
      hasMore,
      nextCursor: hasMore ? Number(paginationCursor) : null,
    }));

    setLoading(false);
  }, [data]);

  const lastAlbum = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (data.hasMore) {
            getAlbums();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <PageContent title="Novidades">
      {data.albums.length === 0 ? (
        <NoContent message="Nenhum CD encontrado" />
      ) : (
        <Grid templateColumns={grid} gap={6}>
          {data.albums.map((album, i) => (
            <AlbumCard
              key={album.id}
              album={album}
              ref={i === data.albums.length - 1 ? lastAlbum : undefined}
            />
          ))}
        </Grid>
      )}
    </PageContent>
  );
};

export default Albums;
