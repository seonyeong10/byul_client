import { JustifyFlex } from "@components/div";
import colors from "src/styles/Colors";
import styled from "styled-components";

//== type ==//

//== style ==//
const ListHeader = styled(JustifyFlex)`
    border-bottom: 1px solid ${colors.black.light};
    grid-column: 1 / span 5;

    @media(max-width: 800px) {
        grid-column: 1 / span 3;
    }
`;

const MyHeader = styled(ListHeader)`
    grid-column: 1 / span 4;

    @media(max-width: 800px) {
        grid-column: 1 / span 2;
    }
`;

export { ListHeader, MyHeader };