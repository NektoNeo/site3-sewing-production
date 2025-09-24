declare module 'vanta/dist/vanta.dots.min' {
  const content: any;
  export default content;
}

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}