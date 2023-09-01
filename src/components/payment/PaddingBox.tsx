import colors from "src/styles/Colors";
import styled from "styled-components";

const PaddingBox = styled.div`
    width: 100%;
    padding: 1vw 0;

    @media(max-width: 800px) {
        padding: 2vw 0;
    }
`;

const MethodWrap = styled(PaddingBox)`
    margin-top: 1vw;
    
    input[type="radio"] {
        appearance: none;
    }

    input[type='radio']:checked + label {
        border-color: ${colors.black.deep};
        color: ${colors.black.deep};
    }

    input[type='radio']:checked + label:before {
        background-image: url('http://localhost:5173/src/assets/icons/payment.svg');
    }
`;

export { PaddingBox, MethodWrap };