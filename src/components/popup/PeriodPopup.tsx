import colors from "src/styles/Colors";
import styled from "styled-components";

const PeriodPopup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    border-radius: 5px;
    background-color: #fff;
    padding: 1vw;
    width: 30vw;

    & > div {
        padding: 1vw 0;
        
        &:not(:nth-of-type(1)) {
            border-top: 1px solid ${colors.black.light};
        }
    }

    label:not(:first-child) {
        margin-left: 2vw;
    }

    @media(max-width: 800px) {
        width: 80vw;
        padding: 5vw 5vw 0 5vw;

        & > div {
            padding: 5vw 0;
        }
    }
`;

export { PeriodPopup };