import styled from "styled-components";
import colors from "src/styles/Colors";
import { GapFlex } from "../FlexBox";

const ItemWrapper = styled(GapFlex)`
    width: 100%;
    align-items: initial;
    border-bottom: 1px solid ${colors.black.light};
    padding-bottom: 2vw;
`;

export { ItemWrapper };