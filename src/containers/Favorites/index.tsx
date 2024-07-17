import React from "react";
import { AlbumCard } from "../../components/AlbumCard";
import { Grid } from "@chakra-ui/react";
import PageContent from "../../components/Template/PageContent";
import NoContent from "../../components/NoContent";

const grid = {
  base: "repeat(2, 1fr)",
  md: "repeat(3, 1fr)",
  lg: "repeat(4, 1fr)",
  xl: "repeat(6, 1fr)",
};

export interface FavoritesProps {
  initialData: {
    albums: any[];
  };
}

const Favorites = ({ initialData }: FavoritesProps) => {
  return (
    <PageContent title="Favoritos">
      {initialData.albums.length === 0 ? (
        <NoContent message="Nenhum CD favoritado" />
      ) : (
        <Grid templateColumns={grid} gap={6}>
          {initialData.albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </Grid>
      )}
    </PageContent>
  );
};

export default Favorites;
