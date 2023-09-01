import styled from "styled-components";

const AuthForm = styled.form`
    display: grid;
    place-items: center;
    height: 100vh;

    button {
        width: 20vw;
        &:not(:first-child) {
            margin-top: 1vw;
        }
    }

    @media(max-width: 800px) {        
        button {
            width: 40vw;
        }
    } 
`;

export { AuthForm };