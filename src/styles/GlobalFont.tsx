import { createGlobalStyle } from 'styled-components';

import Font_L from '@assets/fonts/PretendardJP-Light.woff';
import Font_R from '@assets/fonts/PretendardJP-Regular.woff';
import Font_B from '@assets/fonts/PretendardJP-Bold.woff';

export default createGlobalStyle`
    @font-face {
        font-family: "PretendartLight";
        src: local("PretendartLight"), url(${Font_L}) format('woff'); 
        font-weight: lighter;
    }
    @font-face {
        font-family: "PretendartRegular";
        src: local("PretendartRegular"), url(${Font_R}) format('woff'); 
        font-weight: normal;
    }
    @font-face {
        font-family: "PretendardBold";
        src: local("PretendardBold"), url(${Font_B}) format('woff'); 
        font-weight: bold;
    }
`;