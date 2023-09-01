import colors from "src/styles/Colors";
import styled from "styled-components";

const GreyBox = styled.div`
    flex: 1;
    width: calc(100% - 4vw);
    padding: 1vw 2vw;
    background-color: ${colors.grey.base};

    div {
        width: 100%;
        padding: 1vw 0;
        p {
            width: 100%;
            padding: 4px 0;
            color: ${colors.black.regular};
            b {
                color: ${colors.black.deep};
                font-size: 17px;
            }
        }
    }

    @media(max-width: 800px) {
        padding: 2vw;
        width: calc(100% - 4vw);
    }
`;

export { GreyBox };