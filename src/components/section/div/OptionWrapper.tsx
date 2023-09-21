import styled, { css } from "styled-components";
import { ReactNode } from "react";

//== type ==//
type WrapperType = {
    padding?: {
        all?: number,
        top?: number,
        left?: number,
        bottom?: number,
        right?: number,
        upNdown?: number,
        leftNrigth?: number
    },
    name?: string,
    children?: ReactNode
}

//== style ==//
const OptionWrapper = styled.div<WrapperType>`
    display: inline-block;
    ${props => {
        if(props.padding?.all) {
            return css`
                width: calc(100% - ${props.padding?.all}vw);
                padding: ${props.padding?.all}vw;
            `;
        } else if(props.padding?.top || props.padding?.bottom || props.padding?.left || props.padding?.right) {
            return css`
                width: calc(100% - (${props.padding?.right ?? 0}vw + ${props.padding?.left ?? 0}vw));
                padding: ${props.padding?.top ?? 0}vw ${props.padding?.right ?? 0}vw ${props.padding?.bottom ?? 0}vw ${props.padding?.left ?? 0}vw;
            `;
        } else if(props.padding?.upNdown || props.padding?.leftNrigth) {
            return css`
                width: calc(100% - (${props.padding?.leftNrigth ?? 0}vw * 2));
                padding: ${props.padding?.upNdown ?? 0}vw ${props.padding?.leftNrigth ?? 0}vw;
            `;
        } else {
            return css`
                width: 100%;
                padding: 0;
            `;
        }
    }};
    margin: 0.3vw 0;

    button {
        vertical-align: middle;
    }
`;

const Label = styled.span`
    display: inline-block;
    width: 50%;
`;

const OptChildWrap = styled.div`
    display: inline-block;
    width: 50%;
    text-align: right;

    p {
        display: inline-block;
        width: auto;
        vertical-align: middle;
        margin-left: 2vw;
    }

    button {
        vertical-align: middle;
    }
`;

//== component ==//
const OptionBox = ({ name = "", children = null, padding }: WrapperType) => {
    return (
        <OptionWrapper padding={padding}>
            { (name === "")? null : <Label>{ name }</Label> }
            { children }
        </OptionWrapper>
    );
}

export { OptionWrapper, OptionBox, OptChildWrap };