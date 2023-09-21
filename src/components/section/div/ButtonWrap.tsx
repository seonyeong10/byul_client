import styled from "styled-components";

const ButtonWrap = styled.div`
    padding: 2vw 0;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    width: 100%;
    margin: 0 -2vw;
    text-align: right;

    button {
        width: calc(50% - 1vw);
        padding-left: 1vw;
        padding-right: 1vw;
        font-size: 17px;

        &:first-child {
            margin-right: 2vw;
        }
    }
`;

export { ButtonWrap };