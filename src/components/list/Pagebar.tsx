import { Link } from "react-router-dom";
import colors from "src/styles/Colors";
import styled from "styled-components";

//== type ==//

//== styled ==//
const Pagebar = styled(Link)`
    color: ${colors.black.regular};
    padding: 5px 12px;
`;

const CurrentPagebar = styled(Pagebar)`
    color: ${colors.black.deep};
    font-weight: bold;
    border: 1px solid ${colors.black.deep};
    border-radius: 5px;
`;

const PageController = styled(Pagebar)`
    height: 17px;
`;

export { Pagebar, CurrentPagebar, PageController };