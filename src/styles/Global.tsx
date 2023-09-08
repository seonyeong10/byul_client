import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
    }

    body {
      margin: 0 5vw;
      letter-spacing: -1px;
      font-family: PretendartRegular, sans-serif, Arial;
      overflow-x: hidden;

    }
    
    #root {
      position: relative;
      height: 100%;
    }

    ul, ol {
      list-style: none;
    }

    a {
      cursor: pointer;
      color: rgba(0,0,0,1);
      text-decoration: none;

      &:hover {
        color: rgba(0,0,0,1);
      }
    }

    img {
      width: 100%;
      height: 100%;
    }

    .clear-underline {
      border-bottom: none !important;
    }

    /*아이콘*/
    .icon {
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;

      &.left {
        background-image: url('http://localhost:5173/src/assets/icons/chevron-left.svg');
      }

      &.right {
        background-image: url('http://localhost:5173/src/assets/icons/chevron-right.svg');
      }
      
      &.dropdown {
        padding: 12px;
        background-image: url('http://localhost:5173/src/assets/icons/chevron-down.svg');
      }

      &.plus {
        background-image: url('http://localhost:5173/src/assets/icons/plus.svg');
        &.inactivated {
          background-image: url('http://localhost:5173/src/assets/icons/plus_inactivated.svg');
        }
      }

      &.minus {
        background-image: url('http://localhost:5173/src/assets/icons/minus.svg');
        &.inactivated {
          background-image: url('http://localhost:5173/src/assets/icons/minus_inactivated.svg');
        }
      }

      &.heart {
        background-image: url('http://localhost:5173/src/assets/icons/heart.svg');
      }

      &.cart {
        background-image: url('http://localhost:5173/src/assets/icons/cart.svg');
      }

      &.setting {
        background-image: url('http://localhost:5173/src/assets/icons/settings.svg');
      }

      &.member {
        background-image: url('http://localhost:5173/src/assets/icons/user-profile.svg');
      }
    }

    @media screen and (max-width: 800px) {
      /*모달*/
      #myModal {
        inset: auto 0px auto auto !important;
        height: 100vh !important;
      }
    }
`;

export default GlobalStyle;