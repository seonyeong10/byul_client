import styled from "styled-components";
import colors from "src/styles/Colors";
import { Btn } from "./Btn";

const CircleBtn = styled(Btn)`
    width: 1.3rem;
    height: 1.3rem;
    padding: 0;
    margin: 0px 10px;
    border-radius: 50px;
    background-color: ${colors.white};
    color: rgba(0,0,0,1);
    font-size: 17px;

    &:last-child {
        margin-right: 0;
    }

    &.inactivated {
        border-color: rgba(0,0,0,0.3);
    }
`;

export { CircleBtn };