import colors from "src/styles/Colors";
import styled from "styled-components";

const Note = styled.p`
    color: ${colors.blue.deep};
    font-size: 15px;
    padding: 1vw 0 2vw;

    &:before {
        display: inline-block;
        content: '·';
        margin-right: 5px;
    }

    @media(max-width: 800px) {
        padding: 5vw 0;
    }
`;

export { Note };