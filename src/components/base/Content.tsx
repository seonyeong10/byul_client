import styled from 'styled-components';

interface ContentProps {
    height?: string | number,
}

//== style ==//

const Content = styled.div<ContentProps>`
    padding: 20px 0;
    padding-top: ${props => props.height + 'px' ?? 0};
`;

export { Content };