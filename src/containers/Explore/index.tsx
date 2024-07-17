import React from "react";
import PageContent from "../../components/Template/PageContent";
import SectionTitle from "../../components/SectionTitle";
import ArtistCard from "../../components/ArtistCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { AlbumCard } from "../../components/AlbumCard";
import { VStack } from "@chakra-ui/react";

import "swiper/css";

interface Data {
  newAlbums: [];
  musics: [];
  categories: { name: string; color: string }[];
  topArtists: [];
}

const Explore: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <PageContent>
      <VStack align="stretch" spacing={16}>
        <div>
          <SectionTitle title="CDs novos" />
          <Swiper
            slidesPerView={2.2}
            spaceBetween={16}
            breakpoints={{
              480: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 4.2,
                spaceBetween: 24,
              },
              992: {
                slidesPerView: 6.2,
                spaceBetween: 24,
              },
            }}
            className="mySwiper"
          >
            {data?.newAlbums.map((album: any) => (
              <SwiperSlide key={album.id}>
                <AlbumCard album={album} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <SectionTitle title="Artistas em destaque" />

          <Swiper
            slidesPerView={2.2}
            spaceBetween={16}
            breakpoints={{
              480: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 4.2,
                spaceBetween: 24,
              },
              992: {
                slidesPerView: 6.2,
                spaceBetween: 24,
              },
            }}
          >
            {data?.topArtists.map((artist: any) => (
              <SwiperSlide key={artist.id} style={{ height: "auto" }}>
                <ArtistCard artist={artist} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </VStack>
    </PageContent>
  );
};

export default Explore;
