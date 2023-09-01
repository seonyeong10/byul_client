import reactSvg from "@assets/react.svg";
import styled from "styled-components";
import { ReactNode } from "react";
import colors from "src/styles/Colors";

//== type ==//
type TableBodyType = {
    condition: string,
    num: number,
    imgSrc?: string,
    children?: ReactNode,
    onClick: (id: number) => void
}

//== style ==//
const TableBody = styled.div`
    grid-column: 1 / span 2;

    padding: 1vw 0;
    cursor: pointer;

    div {
        margin: 0 0 0.01vw 0;
        * {
            font-size: 15px;
            color: rgba(0,0,0,0.6);
        }
    }
    
    input {
        display: inline;
        vertical-align: top;
    }

    span {
        color: ${colors.black.regular};
    }
`;

const TImg = styled.img`
    display: inline-block;
    width: 10vw;
    height: 10vw;
    border-radius: 50px;
    margin: 0 2vw;
    vertical-align: middle;
`;

const TBodyChild = styled.div`
    display: inline-block;
    width: calc(100% - 1rem - 14vw);
    vertical-align: middle;
    margin: auto 0;

    &:not(:last-child) {
        padding-bottom: 1vw;
    }
`;

const TName = styled.p`
    padding-bottom: 0.7vw;
    color: ${colors.black.deep} !important;
    line-height: 1.3rem;
    font-size: 17px !important;
`;

//== component ==//
const TBody = ({ condition = "index", num, imgSrc = reactSvg, children, onClick }: TableBodyType) => {
    return (
        <TableBody onClick={() => onClick(num)}>
            {
                (condition === 'check') ? 
                    <input type="checkbox" name="delete" value={num} onClick={() => onClick(num)}/> : num
            }
            <TImg src={imgSrc} alt="장바구니"/>
            {children}
        </TableBody>
    );
}


export { TBody, TBodyChild, TName };