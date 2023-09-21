import colors from "src/styles/Colors";
import styled from "styled-components";

// type

// style
const HeadLine = styled.h1`
    font-size: 24px;
    letter-spacing: 0px;
`;

const SectionTitle = styled.h3`
    font-size: 17px;
    // padding: 6px 6px 6px 0;
    padding: 6px 0px 6px 0;
    margin: 0;
    display: inline-block;
    p {
        text-align: center;
    }
`;

const PopupTitle = styled(SectionTitle)`
    width: 100%;
    padding: 0 0 1vw;
    text-align: center;
    border-bottom: 1px solid ${colors.black.deep};

    @media(max-width: 800px) {
        padding: 0 0 5vw;
    }
`;



// component

export { HeadLine, SectionTitle, PopupTitle };