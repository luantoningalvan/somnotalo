import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding:0;
    box-sizing: border-box;
  }

  body {
    background: #10101d;
    color: white;
  }

  body, button, input {
    font-family: 'Poppins';
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-button {
    width: 1px;
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background: #34344e;
    border: 0 none #fff;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #666;
  }
  ::-webkit-scrollbar-track {
    background: rgba(22, 22, 39,0.4);
    border: 0 double #fff;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track:active {
    background: rgba(22, 22, 39,0.4);
  }
  ::-webkit-scrollbar-corner {
    background: 0 0;
  }
`;

export const HeaderContainer = styled.div<{ open: boolean }>`
  display: flex;
  height: 64px;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: ${(props) => (props.open ? "220px" : "0")};
  top: 0;
  width: ${(props) => (props.open ? "calc(100% - 220px)" : "100%")};
  background: #161627;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const SidebarContainer = styled.aside<{ full?: boolean }>`
  background: #191926;
  position: fixed;
  left: 0;
  top: 0;
  width: ${(props) => (props.full ? "100vw" : "220px")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  .menu-tab {
    margin: 0px;
    display: flex;
    flex-direction: column;
  }

  ul {
    flex: 1;
  }

  .links {
    padding: 24px;
    font-size: 0.8rem;

    a {
      display: inline-block;
      color: #b1b1b1;
      margin-right: 8px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const SidebarContainerMenuItem = styled.li<{ current: boolean }>`
  list-style: none;
  line-height: 22px;

  a {
    flex: 1;
    color: white;
    text-decoration: none;
    display: block;
    padding: 12px 8px;
    margin: 4px 16px;
    transition: 0.4s;
    border-radius: 4px;
    color: #cacaca;
    display: flex;
    align-items: center;
    gap: 16px;

    &:hover {
      color: white;
    }

    ${(props) =>
      props.current &&
      css`
        background-color: #28283a;
        color: white;
      `}
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 64px;
  padding: 0px 16px;

  img {
    height: 40px;
  }
`;

export const MainContainer = styled.main<{ isDrawerSidebar: boolean }>`
  margin: ${(props) => (props.isDrawerSidebar ? "64px 0px" : "64px 0 0 220px")};
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  height: 44px;
  padding: 8px 12px;
  margin: 16px;
  transition: border-color 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #636363;

  &:focus-within {
    outline: 2px solid #0095ff;
  }

  input {
    background: transparent;
    border: none;
    height: 50px;
    color: white;
    outline: none;
    font-size: 0.9rem;
    margin-left: 8px;
    flex: 1;
    width: 100%;

    &::placeholder {
      color: #636363;
    }
  }
`;

export const PlayerPositioner = styled.div`
  background: #161627;
  box-shadow: 0px 2px 5px rgb(0 0 0 / 20%);
  width: calc(100% - 220px);
  position: fixed;
  top: 0;
  right: 0;
  padding: 0 32px;
  z-index: 100;

  @media (max-width: 62em) {
    bottom: 0;
    top: auto;
    width: 100%;
    padding: 0 0px;
    z-index: 200;
  }
`;
