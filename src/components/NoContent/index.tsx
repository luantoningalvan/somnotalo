import styled from "styled-components";
import { IoMusicalNotesSharp } from "react-icons/io5";
interface NoContentProps {
  message: string;
}

const NoContentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a9a9a;
  text-align: center;
  flex-direction: column;
  font-size: 1.2rem;

  span {
    display: block;
    margin-top: 24px;
  }
`;

const NoContent: React.FC<NoContentProps> = (props) => {
  const { message } = props;
  return (
    <NoContentStyled>
      <IoMusicalNotesSharp size={96} color="#9a9a9a" />
      <span>{message}</span>
    </NoContentStyled>
  );
};

export default NoContent;
