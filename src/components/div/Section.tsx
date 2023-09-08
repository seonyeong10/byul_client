import colors from "src/styles/Colors";
import styled from "styled-components";

const Section = styled.div`
    padding: 5vw 0;
    text-align: center;

    h1 {
        border-bottom: 1px solid rgba(0,0,0,0.15);
        padding: 10px 0;
        text-align: left;
    }

    .container {
        overflow: hidden;
        position: relative;
        
        .section-slider {
            width: 100%;
            height: 100%;
            position:absolute;
            z-index: 1;
            button {
                width: 2vw;
                height: 100%;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                background-color: rgba(255, 255, 255, 0);
                border: none;
                cursor: pointer;
                z-index: 1;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.15);
                }

                &.previous {
                    background-image: url('http://localhost:5173/src/assets/icons/chevron-left_d.svg');
                }

                &.next {
                    background-image: url('http://localhost:5173/src/assets/icons/chevron-right_d.svg');
                    float: right;
                }
            }
        }

        .slide-contents {
            width: 200vw;
            transition: transform 0.5s;

            .slide {
                float: left;
                width: calc(82vw / 4); //90vw-8vw
                text-align: center;

                &:not(:first-child) {
                    margin-left: 2vw;
                }

                img {
                    display: block;
                    width: 100%;
                }

                p {
                    font-size: 18px;
                }
            }
        }

        .contents {
            .item {
                display: inline-block;
                width: calc((100% - 8rem) / 5);
                text-align: center;
                margin: 1vw auto;

                &:not(:nth-child(5n+1)) {
                    margin-left: 2rem;
                }
            }
        }

        .view-more {
            margin: 5vw 0 0;
            padding: 1vw 3vw;
            border: 1px solid ${colors.black.deep};
            background-color: rgba(255, 255, 255, 0);
            border-radius: 50px;
            cursor: pointer;
            font-size: 15px;

            &:hover {
                background-color: ${colors.black.deep};
                color: rgba(255, 255, 255, 1);
            }
        }
    }

    @media screen and (max-width: 800px) {
        .container {
            .section-slider {
                button {
                    width: 4vw;
                }
            }

            .slide-contents {
                width: 300vw;
                .slide {
                    width: calc((90vw - 3vw) / 3)/*calc((90vw - 8vw - 3vw) / 3)*/;

                    &:not(:first-child) {
                        margin-left: 1.5vw;
                    }
                }
            }

            .contents {
                .item {
                    width: calc((100% - 9rem) / 3);
                    &:not(:nth-child(5n+1)) {
                        margin-left: 0;
                    }
                    &:not(:nth-child(3n+1)) {
                        margin-left: 4.5rem;
                    }
                }
            }

            .view-more {
                font-size: 13px;
            }
        }
    }
`;

export { Section };