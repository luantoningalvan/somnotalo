import styled from "styled-components";

export const QueueItem = styled.li<{ current: boolean }>`
  list-style: none;
  padding: 8px 16px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: ${(props) => (props.current ? "rgba(0,0,0,0.4)" : "transparent")};

  > div {
    margin-left: 8px;
  }

  .music-cover {
    height: 64px;
    width: 64px;
    border-radius: 2px;
  }

  .music-name {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    display: block;
  }

  .music-artist {
    font-size: 0.7rem;
    margin-top: 5px;
    color: #7b7c8b;
    display: block;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const QueueDivider = styled.fieldset`
  border: 2px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.08);
  text-align: center;
  margin-top: 12px;

  > legend {
    padding: 0 12px;
    font-size: 12px;
    color:  rgba(255, 255, 255, 0.16);
  }
`
