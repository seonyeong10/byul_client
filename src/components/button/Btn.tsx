import styled from "styled-components";
import colors from "src/styles/Colors";

const Btn = styled.button`
    width: 100%;
    padding: 10px;
    border: 1px solid ${colors.black.deep};
    border-radius: 3px;
    background-color: ${colors.black.deep};
    color: ${colors.white};
    cursor: pointer;
`;

export { Btn };