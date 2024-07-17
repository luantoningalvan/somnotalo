import styled from "styled-components";

export const CropperStyle = styled.div`
  width: 100%;

  .crop-content {
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
  }

  img {
    height: auto;
    max-height: 100%;
  }

  .slider {
    padding: 16px;
  }
`;
