import { ReactNode, forwardRef } from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import colors from 'src/styles/Colors';

//== type ==//
interface AnchorProps {
    children: ReactNode,
    paddingLeft?: string,
    condition?: string,
    onClick?: any,
    to?: string
}

//== style ==//
const Anchor = styled(Link)<AnchorProps>`
    color: ${(props) => props.condition === "select" ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.6)'};

    &:before {
        display: ${props => props.condition === "delemiter" ? 'inline-block' : 'none'};
        content: '';
        border-left: 1px solid;
        border-color: ${props => props.condition === "delemiter" ? 'rgba(0,0,0,0.15)' : 'none'};
        margin: 0 8px;
        height: 11px;
    }
`;

const StyledAnchorBackground = styled(Link)<AnchorProps>`
    color: ${props => props.condition === "select" ? '#fff' : 'rgba(0,0,0,0.6)'};

    ${props => {
        if(props.condition === "select")
            return css`
                border-radius: 50px;
                background-color: rgba(0,0,0,1);

                &:hover {
                    color: #ffffff !important;
                }
            `;
    }}

    color: rgba(0,0,0,1);

    &.select {
        color: #ffffff;
        border-radius: 50px;
        background-color: rgba(0,0,0,1);

        &:hover {
            color: #ffffff !important;
        }
    }
`;

//Drop down anchor
const DDA = styled(Link)`
    //background
    background-image: url('http://localhost:5173/src/assets/icons/chevron-down.svg');
    background-size: 1.5vw;
    background-position: right top;
    background-repeat: no-repeat;

    //text
    font-weight: bold;
    font-size: 17px;
    padding: 0 0 1vw;

    border-bottom: 1px solid ${colors.black.light};
`;


//== component ==//
const AnchorBottomLine = styled(Link)<AnchorProps>`
    color: ${props => props.condition === "select" ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.6)'};

    ${props => {
        if (props.condition === "select")
            return css`
                border-bottom: 2px solid rgba(0,0,0,1);
            `;
    }}
`;

const AnchorBackground = forwardRef<HTMLAnchorElement, AnchorProps>(({ to, condition, children, onClick }, ref) => {
    return (
        <StyledAnchorBackground
            ref={ref}
            className={condition}
            to={to}
            onClick={onClick}>
            {children}
        </StyledAnchorBackground>
    );
}); 

export { Anchor, AnchorBackground, AnchorBottomLine, DDA };