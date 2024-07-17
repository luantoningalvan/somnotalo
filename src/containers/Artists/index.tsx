import React, { useEffect, useState } from "react";
import { CircularProgress } from "@chakra-ui/react";
import api from "../../services/api";
import PageContent from "../../components/Template/PageContent";
import NoContent from "../../components/NoContent";
import ArtistCard from "../../components/ArtistCard";
import { ArtistList } from "./styles";

const Artists = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getArtists() {
      setLoading(true);
      const result = await api.get("/artists");
      setData(result.data);
      setLoading(false);
    }
    getArtists();
  }, []);

  return (
    <PageContent title="Artistas">
      {loading ? (
        <CircularProgress />
      ) : data.length === 0 ? (
        <NoContent message="Nenhum artista encontrado" />
      ) : (
        <ArtistList>
          {data.map((artist) => (
            <ArtistCard artist={artist} key={artist.id} />
          ))}
        </ArtistList>
      )}
    </PageContent>
  );
};

export default Artists;
