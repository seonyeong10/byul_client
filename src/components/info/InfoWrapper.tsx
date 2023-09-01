import { GapFlex, Grid } from "@components/div";
import colors from "src/styles/Colors";
import styled from "styled-components";

//== type ==//
type HistoryType = {
    height?: number
}

//== style ==//
const InfoWrapper = styled(GapFlex)`
`;

const InfoBoxWrapper = styled(GapFlex)`
    width: 100%;
    align-items: initial;
    border-bottom: 1px solid ${colors.black.light};
    padding-bottom: 2vw;
`;

const InfoStatusWrapper = styled(Grid)<HistoryType>`
    grid-template-columns: 1fr;
    align-content: space-between;
    height: ${props => props.height? `calc(100vh - ${props.height}px - 40px)` : 'auto'};
`;

const DetailWrapper = styled.div`
    border-bottom: 1px solid rgba(0,0,0,0.5);

    & > div:last-child {
        padding: 1vw 0;
    }
`;

export { InfoWrapper, InfoBoxWrapper, InfoStatusWrapper, DetailWrapper };