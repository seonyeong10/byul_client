import styled from "styled-components";

interface FormType {
    gap?: number,
    padding?: {
        all?: number,
        top?: number,
        left?: number,
        bottom?: number,
        right?: number,
        upNdown?: number,
        leftNrigth?: number
    },
}

const InnerForm = styled.form<FormType>`
display: flex;
gap: ${props => props.gap ?? 0}vw;
flex-direction: column
`;

export { InnerForm };