import { IconButton } from "@components/button";
import { GapFlex, JustifyFlex } from "@components/section";
import { SectionTitle } from "@components/text";
import colors from "src/styles/Colors";
import styled from "styled-components";

//== type ==//

//== style ==//
const HeaderInfoWrapper = styled(JustifyFlex)`
    border-bottom: 1px solid ${colors.black.light};
`;

const HeaderIconBtn = styled(IconButton)`
    width: 120px;
    background-position: left !important;
`;

const HeaderSectionTit = styled(SectionTitle)`
    min-width: 120px;
    padding-right: 0;
    text-align: center;
`;

const HeaderInfoFlex = styled(GapFlex)`
    width: 120px;
    justify-content: flex-end !important;
`;

export { HeaderInfoWrapper, HeaderIconBtn, HeaderSectionTit, HeaderInfoFlex };