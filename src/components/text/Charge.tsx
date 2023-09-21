import colors from "src/styles/Colors";
import styled from "styled-components";

const Charge = styled.span`
    float: right;
`;

const Discount = styled(Charge)`
    color: ${colors.grey.accent};
`;

export { Charge, Discount };