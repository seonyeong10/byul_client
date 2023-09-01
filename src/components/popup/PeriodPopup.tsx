import colors from "src/styles/Colors";
import styled from "styled-components";

const PeriodPopup = styled.div`
    & > div {
        padding: 1vw 0;
        
        &:not(:nth-of-type(1)) {
            border-top: 1px solid ${colors.black.light};
        }
    }

    label:not(:first-child) {
        margin-left: 2vw;
    }

    @media screen and (max-width: 800px) {
        & > div {
            padding: 2vw 0;
        }
    }
`;

export { PeriodPopup };