import React from "react";
import { ArtistHeader, ContactsList } from "./styles";
import { AlbumCard } from "../../components/AlbumCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Heading } from "@chakra-ui/react";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiWhatsappLine,
  RiYoutubeLine,
  RiGlobalLine,
  RiTelegramLine,
  RiTwitterLine,
  RiSoundcloudFill,
  RiSpotifyLine,
  RiTwitchLine,
  RiMailLine,
} from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import SectionTitle from "../../components/SectionTitle";

import "swiper/css";

type Contact =
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "youtube"
  | "website"
  | "email";
interface SingleArtistProps {
  artist: {
    id: number;
    slug: string;
    name: string;
    cover: string;
    albums: any[];
    contacts:
      | null
      | {
          [key in Contact]: string;
        };
  };
}

const Contact = ({ url, type }: { url: string; type: Contact }) => {
  const contactMethods = {
    email: <RiMailLine />,
    whatsapp: <RiWhatsappLine />,
    telegram: <RiTelegramLine />,
    instagram: <RiInstagramLine />,
    facebook: <RiFacebookLine />,
    youtube: <RiYoutubeLine />,
    twitter: <RiTwitterLine />,
    tiktok: <SiTiktok />,
    soundcloud: <RiSoundcloudFill />,
    spotify: <RiSpotifyLine />,
    twitch: <RiTwitchLine />,
    link: <RiGlobalLine />,
  };

  let urlToUse = url;

  if (type === "email") {
    urlToUse = `mailto:${url}`;
  }

  if (type === "whatsapp") {
    urlToUse = `https://wa.me/${url}`;
  }

  return (
    <li>
      <a href={urlToUse} target="_blank">
        {contactMethods[type]}
      </a>
    </li>
  );
};

const SingleArtist = (props: SingleArtistProps) => {
  const { artist } = props;

  return (
    <div id="artist">
      <ArtistHeader cover={artist.cover}>
        <div>
          <Heading as="h3" lineHeight="110%">
            {artist.name}
          </Heading>

          {artist.contacts && (
            <ContactsList>
              {Object.entries(artist.contacts).map(([type, url]) => (
                <Contact type={type as Contact} url={url} />
              ))}
            </ContactsList>
          )}
        </div>
      </ArtistHeader>

      <div style={{ padding: 32 }}>
        {artist.albums.length > 0 && (
          <>
            <SectionTitle title="CDs" />
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
              {artist.albums.map((album) => (
                <SwiperSlide key={album.id}>
                  <AlbumCard hideAuthor album={album} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleArtist;
