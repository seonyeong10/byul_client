import styled from "styled-components";

const TextTitle = styled.p`
    font-size: 24px;
    font-weight: bold;
    
    span {
        display: block;
        padding: 3px;
        font-size: 15px;
        color: rgba(0,0,0,0.6);
        font-weight: lighter;
    }
`;

const TextSizeR = styled.p`
    text-align: right;
    font-size: 17px;
`;

const SmallText = styled.small`
    display: block;
    font-size: 15px;
    color: rgba(0,0,0,0.6);
`;

const RightSpan = styled.span`
    float: right;
`;

export { TextTitle, TextSizeR, SmallText, RightSpan }