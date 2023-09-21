import styled from "styled-components";
import colors from "src/styles/Colors";
import { Btn } from "./Btn";

interface Type {
    color?: string,
    borderColor?: string,
    background?: string,
    onClick?: () => void
}

const CustomBtn = styled(Btn)<Type>`
    border-raduis: 5px;

    background-color: ${props => props.background ? props.background : colors.white};
    border: 1px solid ${props => props.background ? props.background : colors.black.deep};
    color: ${props => props.color ? props.color : colors.black.deep};
`;

export { CustomBtn };