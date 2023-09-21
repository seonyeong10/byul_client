import styled from "styled-components";
// import { ReactNode } from 'react';
import { JustifyFlex } from "@components/section";
import colors from "src/styles/Colors";

//== type ==//

//== style ==//
const HeaderTop = styled(JustifyFlex)`
    margin: 0 -5vw;
    padding: 0 5vw 1vw;
    border-bottom: 1px solid ${colors.black.light};
`;

export { HeaderTop };