import colors from 'src/styles/Colors';
import styled from 'styled-components';


const SubTitle = styled.p`
    font-size: 14px;
    color: rgba(0,0,0,0.6);
    padding-top: 8px;
`;

const ColorEmpasis = styled.p`
    font-size: 18px;
    font-weight: bold;
    // color: ${props => props.color ?? 'rgba(0,0,0,1)'};
    color: ${colors.blue.regular};
`;

export { SubTitle, ColorEmpasis };