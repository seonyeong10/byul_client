export {};

declare global {
    interface Window {
        parentCallback: any;
        receiveMessage: any;
    }
}