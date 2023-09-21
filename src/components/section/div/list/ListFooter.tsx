import { JustifyFlex } from "@components/section";
import colors from "src/styles/Colors";
import styled from "styled-components";

//== type ==//

//== style ==//
const ListFooter = styled(JustifyFlex)`
    justify-content: center;
    border-top: 1px solid ${colors.black.light};
    grid-column: 1 / span 5;
    gap: 8px;

    @media(max-width: 800px) {
        grid-column: 1 / span 3;
    }
`;

export { ListFooter };