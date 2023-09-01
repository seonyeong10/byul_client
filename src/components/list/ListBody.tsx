import styled from "styled-components";
// import { ReactNode } from "react";

//== type ==//
type ListBodyType = {
    key: string,
    imgSrc: string,
    name: string,
    path: string,
    onClick: (path: string) => void
}

//== style ==//
const Lbody = styled.div`
    text-align: center;
    cursor: pointer;
`;

const Limage = styled.img`
    margin-bottom: 1vw;
`;

const ListBody = ({ key, imgSrc, name, path, onClick }: ListBodyType) => {
    return (
        <Lbody key={key} onClick={() => onClick(path)}>
            <Limage src={imgSrc}/>
            <p>{name}</p>
        </Lbody>
    );
}

export { ListBody };