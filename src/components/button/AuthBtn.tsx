import styled from "styled-components";
import colors from "src/styles/Colors";

const AuthBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 1vw;
    background-color: ${colors.white};
    border: 1px solid ${colors.black.light};
    padding: 0px 15px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;

    img {
        width: 46px;
        height: 46px;
    }
`;

export { AuthBtn };