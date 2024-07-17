import styled from "styled-components";

export const ContentList = styled.div`
  margin: 32px 0;
`;

export const DropzoneBox = styled.div`
  border-radius: 4px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23ccc' stroke-width='1' stroke-dasharray='6%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  padding: 32px;
  text-align: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #ccc;

  svg {
    height: 32px;
    width: 32px;
    margin-bottom: 8px;
  }
`;

export const FileListItem = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 8px 16px;
  list-style: none;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
  }

  .file-size {
    color: #ccc;
    font-size: 0.8rem;
    margin-top: 4px;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 16px;

    svg {
      height: 22px;
      width: 22px;
    }
  }

  & + & {
    margin-top: 4px;
  }
`;
