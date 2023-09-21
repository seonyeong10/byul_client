import styled from "styled-components";
import { CircleBtn } from ".";
import { OptChildWrap } from "@components/section";

//== type ==//
type CountLumpType = {
    count: number,
    variable: string,
    value?: string,
    minusFC: (variable: string, value?: string) => void,
    plusFC: (variable: string, value?: string) => void,
}

//== style ==//
const Count = styled.span`
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    text-align: center;
`;

//== component ==//
const CountBtnLump = ({ variable, value = "", count, minusFC, plusFC }: CountLumpType) => {
    return (
        <OptChildWrap>
            <CircleBtn type="button" onClick={() => minusFC(variable, value)} className={`icon minus ${(count > 1) ? '' : 'inactivated'}`}></CircleBtn>
            <Count>{count}</Count>
            <CircleBtn type="button" onClick={() => plusFC(variable, value)} className="icon plus"></CircleBtn>
        </OptChildWrap>
    );
}

export { CountBtnLump, Count };