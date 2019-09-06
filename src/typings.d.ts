/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface Document {
    msExitFullscreen: any;
    mozCancelFullScreen: any;
    mozFullScreenElement:any;
    msFullscreenElement:any;
}
declare var L:any;  //leaflet