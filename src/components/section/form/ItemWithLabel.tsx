import styled from "styled-components";
import { ReactNode } from "react";

interface ItemWithLabelProps {
    label: string,
    key: string,
    children: ReactNode
}

const StyleItemWithLabel = styled.div`
    &:not(:first-child) {
        padding: 1vw 0;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }
`;

const StyleCountWithLabel = styled(StyleItemWithLabel)`
    display: flex;
    justify-contnet: space-bewteen;
`;

const ItemWithLabel = ({ key = "", label, children } : ItemWithLabelProps) => {
    return (
        <StyleItemWithLabel>
            <label htmlFor={'form-' + key}>{label}</label>
            {children}
        </StyleItemWithLabel>
    );
}

const CountWithLabel = ({ key, label, children } : ItemWithLabelProps) => {
    return (
        <StyleCountWithLabel>
            <label htmlFor={'form-' + key}>{label}</label>
            {children}
        </StyleCountWithLabel>
    );
}

export { ItemWithLabel, CountWithLabel };