import { GapFlex } from "@components/section";
import colors from "src/styles/Colors";
import styled from "styled-components";

//== type ==//
type FormType = {
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

//== style ==//
const InfoBox = styled(GapFlex)`
    flex-grow: 2;

    align-items: initial;
    justify-content: space-between;
`;

const InfoBoxChild = styled(GapFlex)`
    align-items: initial;
`;

const FormBox = styled.form<FormType>`
    display: flex;
    gap: ${props => props.gap ?? 0}vw;
    flex-direction: column
`;

const DetailBox = styled.div`
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    color: ${colors.black.regular};
    font-size: 15px;
    padding: 2vw 0;

    border-bottom: 1px solid ${colors.black.light};

    * {
        margin: 0 0 0.1vw 0;
    }
`;

export { InfoBox, InfoBoxChild, FormBox, DetailBox };