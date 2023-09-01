import { Flex } from "@components/div";
import styled from "styled-components";

//== style ==//
const StatusWrap = styled(Flex)`
    text-align: center;
    justify-content: space-around;
    padding: 14px 0;
    background-color: #eeeeee; //rgba(180, 215, 254, 0.3);
    border-radius: 5px;

    background-image: url('http://localhost:5173/src/assets/icons/line.svg');
`;

const Status = styled.div`
    min-width: 120px;
        
    &.curr {
        &:before {
            background-image: url('http://localhost:5173/src/assets/icons/filledDot.svg');
        }
        font-weight: bold;
    }

    &:before {
        display: block;
        content: '';
        background-image: url('http://localhost:5173/src/assets/icons/dot.svg');
        width: 30px;
        height: 30px;
        margin: 0 auto;
        z-index: 9;
    }

    p:first-child {
        padding-bottom: 0.5vw;
    }
`;

export { StatusWrap, Status };