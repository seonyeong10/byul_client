import styled from "styled-components";
import colors from "src/styles/Colors";

const LineBox = styled.div`
    padding: 2vw 2vw 0vw;
    width: calc(100% - 4vw);
    border-top: 1px solid ${colors.black.light};

    p {
        margin: 10px 0;
        * {
            font-size: 17px;
        }

        &:last-child {
            margin: 2vw 0;
            * {
                font-size: 20px;
            }
        }
    }
    
    @media(max-width: 800px) {
        padding: 2vw;/
        width: calc(100% - 4vw);
    }
`;

export { LineBox };