import { Link } from "react-router-dom";
import styled from "styled-components";

//== type ==//

//== style ==//
const Subject = styled(Link)`
    font-size: 20px;
    padding: 0 1vw;

    &:nth-of-type(1) {
        margin-left: 1vw;
    }
`;

const CurrentSubject = styled(Subject)`
    margin: 0;
    padding: 0;
    font-weight: 600;

    &:before {
        display: inline-blokc;
        content: ' ';
        border-left: 1px solid rgba(0,0,0, 0.15);
        height: 17px;
        padding-right: 1vw;
    }
`;

export { Subject, CurrentSubject }