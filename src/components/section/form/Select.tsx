import styled from "styled-components";
import { forwardRef, ReactNode } from 'react';

interface SelectProps {
    id: string,
    name: string,
    onChange: any,
    children: ReactNode
}

const StyledSelect = styled.select`
    width: 100%;
    padding: 8px 10px;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 3px;
    color: rgba(0,0,0,0.3);
    font-size: 17px;

    &:focus {
        outline: none;
    }

    &:disabled {
        opacity: 0.5;
    }

    option:selected {
        color: red;
    }
`;

//== component ==//
const Select = forwardRef<HTMLSelectElement, SelectProps>(({ id, name, onChange, children }, ref) => {
    return (
        <StyledSelect id={id} ref={ref} name={name} onChange={onChange}>{children}</StyledSelect>
    );
});

export { Select }