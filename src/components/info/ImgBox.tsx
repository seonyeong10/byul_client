import colors from "src/styles/Colors";
import styled from "styled-components";

//== type ==//
type ImgBoxType = {
    imgSrc: string
}

//== style ==//
const Box = styled.div`
`;

const Img = styled.img`
    width: 30vw;
    height: 100%;
    max-height: 35vw;
    background-color: ${colors.black.deep};
`;

//== component ==//
const ImgBox = ({ imgSrc }: ImgBoxType) => {
    return (
        <Box>
            <Img src={imgSrc}/>
        </Box>
    );
}

export { ImgBox };