import styled from "styled-components";

export const AlbumHeader = styled.div<{ cover: string }>`
  display: flex;
  align-items: center;
  padding: 32px;
  gap: 32px;

  h2 {
    font-size: 28px;
    line-height: 28px;
  }

  .album-cover {
    flex-grow: 0;

    img {
      height: 250px;
      width: 250px;
      border-radius: 6px;
    }
  }

  .artist {
    display: flex;
    align-items: center;
    margin-top: 12px;

    img {
      height: 24px;
      width: 24px;
      border-radius: 50%;
      margin-right: 8px;
    }

    a {
      color: #ccc;
      font-size: 1rem;
      text-decoration: none;
    }
  }

  @media (max-width: 48em) {
    justify-content: center;
    text-align: center;
    flex-direction: column;

    .album-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
`;
export const AlbumMusics = styled.div`
  margin: 0px 32px 32px 32px;

  @media (max-width: 48em) {
    margin: 0px 12px 12px 12px;
  }
`;
