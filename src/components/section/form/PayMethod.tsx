import colors from "src/styles/Colors";
import styled from "styled-components";

const PayMethod = styled.label`
    display: inline-block;
    width: auto;
    cursor: pointer;
    text-align: center;
    border: 3px solid ${colors.grey.main};
    padding: 1vw 2vw;
    border-radius: 10px;
    color: ${colors.grey.main};

    &:not(:last-child) {
        margin-right: 2vw;
    }

    &:before {
        display: block;
        cursor: pointer;
        content: '';
        width: 4vw;
        height: 4vw;
        background-image: url('http://localhost:5173/src/assets/icons/payment_uncheck.svg');
        background-position: top center;
        background-size: contain;
        background-repeat: no-repeat;
        padding-bottom: 10px;
    }
`;

export { PayMethod };