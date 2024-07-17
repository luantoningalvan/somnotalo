import styled from "styled-components";

export const ArtistHeader = styled.div<{ cover: string }>`
  height: 384px;
  width: 100%;
  background: url(${(props) => props.cover}),
    linear-gradient(90deg, rgba(0, 0, 0, 0.9) 10%, rgba(0, 0, 0, 0.2) 100%);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 64px;

  h3 {
    font-size: 3rem;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  }

  span {
    color: #ccc;
  }

  @media (max-width: 62em) {
    padding: 24px;
    height: 300px;
  }
`;

export const AlbumsCarousel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > button {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background: white;
    color: #333;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 80px;
    z-index: 2;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);

    svg {
      height: 26px;
      width: 26px;
    }
  }

  .next-btn {
    margin-right: -10px;
  }
  .prev-btn {
    margin-left: -10px;
  }
`;

export const ContactsList = styled.ul`
  display: flex;
  gap: 8px;
  margin-top: 16px;

  li {
    list-style: none;
    font-size: 28px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    padding: 8px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;
