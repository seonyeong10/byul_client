import styled, { css } from 'styled-components';

//== type ==//
interface FlexType {
    direction?: string,
    gap?: number,
    padding?: {
        all?: number,
        top?: number,
        left?: number,
        bottom?: number,
        right?: number,
        upNdown?: number,
        leftNrigth?: number
    }
}

//== style ==//
const Flex = styled.div<FlexType>`
    display: flex;
    align-items: center;

    ${props => {
        if(props.direction) {
            return css`
                flex-direction: ${props.direction};
            `;
        }
    }}

    padding: ${props => {
        if(props.padding?.all) {
            return css`${props.padding?.all}vw`;
        } else if(props.padding?.top || props.padding?.bottom || props.padding?.left || props.padding?.right) {
            return css`${props.padding?.top ?? 0}vw ${props.padding?.right ?? 0}vw ${props.padding?.bottom ?? 0}vw ${props.padding?.left ?? 0}vw`;
        } else if(props.padding?.upNdown || props.padding?.leftNrigth) {
            return css`${props.padding?.upNdown ?? 0}vw ${props.padding?.leftNrigth ?? 0}vw`;
        } else {
            return css`0`;
        }
    }};
`;

const JustifyFlex = styled(Flex)`
    justify-content: space-between;
`;

const GapFlex = styled(Flex)`
    gap: ${props => props.gap ?? 0}vw;
`;



export { Flex, JustifyFlex, GapFlex };