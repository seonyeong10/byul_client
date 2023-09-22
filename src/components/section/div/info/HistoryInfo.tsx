import colors from "src/styles/Colors";
import styled from "styled-components";

const HistoryInfo = styled.div`
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    color: ${colors.black.regular};
    font-size: 15px;
    padding: 2vw 0;

    border-bottom: 1px solid ${colors.black.light};

    * {
        margin: 0 0 0.1vw 0;
    }
`;

export { HistoryInfo };