import styled from 'styled-components';

interface ContentProps {
    height?: string | number,
}

//== style ==//

const Content = styled.div<ContentProps>`
    padding: 2vw 0 20px;
    padding-top: ${props => props.height + 'px' ?? 0};
`;

export { Content };