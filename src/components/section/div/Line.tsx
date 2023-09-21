import colors from "src/styles/Colors";
import styled from "styled-components";

//== style ==//
const Line = styled.div`
    height: 1px;
    grid-column: 1 / span 5;
    border-top: 1px solid ${colors.black.light};
`;

export { Line };