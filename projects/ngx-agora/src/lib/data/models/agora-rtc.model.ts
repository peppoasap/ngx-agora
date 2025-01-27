import * as agoraSDK from 'agora-rtc-sdk';
import {
  Client,
  ClientConfig,
  DesktopCapturerSource,
  MediaDeviceInfo,
  MediaStream,
  Stream,
  StreamSpec,
} from 'agora-rtc-sdk';
import { Logger } from './logger.model';

/**
 * AgoraRTC is the entry point for all the methods that can be called in Agora Web SDK.
 *
 * You can use the AgoraRTC methods to create
 * [Client](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html) and
 * [Stream](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.stream.html) objects.
 * Other methods of the AgoraRTC object check for system requirements and set up error logging.
 */
export interface AgoraRTC {
  /**
   * Checks the Web Browser Compatibility
   *
   * This method checks the compatibility between the Web SDK and the current web browser.
   * Use this method before calling createClient to check the compatibility between the system and the web browser.
   *
   * - true: The Web SDK is compatible with the current web browser.
   * - false: The Web SDK is not compatible with the current web browser.
   *
   * @remark
   * Agora has yet to conduct comprehensive tests on Chromium kernel browsers, such as QQ and 360.
   * Agora will gradually achieve compatibility on most mainstream browsers in subsequent versions of the Web SDK.
   */
  checkSystemRequirements: () => boolean;
  /**
   * Creates a Client Object
   *
   * This method creates and returns a client object. You can only call this method once each call session.
   *
   * @param config
   * Defines the property of the client, see
   * [ClientConfig](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.clientconfig.html) for details.
   *
   * @example
   * AgoraRTC.createClient(config);
   */
  createClient: (config: ClientConfig) => Client;
  /**
   * This method creates and returns a stream object.
   *
   * @example
   * AgoraRTC.createStream(spec)
   *
   * @param spec Defines the properties of the stream
   * @see [StreamSpec](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.streamspec.html) for details.
   */
  createStream: (spec: StreamSpec) => Stream;
  /**
   * This method enumerates the available media input and output devices, such as microphones, cameras, headsets, and so on.
   *
   * If this method succeeds, the SDK returns a list of media devices in an array of `MediaDeviceInfo` objects.
   *
   * @example
   * AgoraRTC.getDevices(devices => {
   *   const devCount = devices.length;
   *   const id = devices[0].deviceId;
   * });
   */
  getDevices: (
    callback: (devices: MediaDeviceInfo[]) => void,
    callback_Error?: (errStr: string) => void
  ) => void;
  /**
   * Gets the Sources for Screen-sharing
   *
   * To share the screen on Electron, call this method to get the screen sources.
   * @see [Share the Screen](https://docs.agora.io/en/Video/screensharing_web?platform=Web#electron) for details.
   *
   * If this method succeeds, the SDK returns a list of screen sources in an array of
   * [DesktopCapturerSource](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.desktopcapturersource.html) objects.
   *
   * @example
   * AgoraRTC.getScreenSources(function(err, sources) {
   *  console.log(sources)
   * }
   *
   */
  getScreenSources: (
    callback: (sources: DesktopCapturerSource[]) => void
  ) => void;
  /**
   * This method returns the codecs supported by both the Agora Web SDK and the web browser.
   * The Agora Web SDK supports VP8 and H.264 for video, and OPUS for audio.
   *
   * This method supports all web browsers. For web browsers that do not support WebRTC or
   * are not recognized, the returned codec list is empty.
   *
   * @remark
   * In the `.then(function(result){})` callback, `result` has the following properties:
   * - `video`: array, the supported video codecs. The array might include `'H264'` and `'VP8'`, or be empty.
   * - `audio`: array, the supported audio codecs. The array might include `'OPUS'`, or be empty.
   *
   * @example
   * // Gets the supported decoding formats as the receiver
   * AgoraRTC.getSupportedCodec()
   *   .then(result => {
   *     console.log(`Supported video codec: ${result.video.join(',')}`);
   *     console.log(`Supported audio codec: ${result.audio.join(',')}`);
   *   });
   *
   * // Gets the supported encoding formats as the sender
   * navigator.mediaDevices.getUserMedia({video: true, audio: true})
   *  .then(mediaStream => {
   *     return AgoraRTC.getSupportedCodec({stream: mediaStream});
   *  })
   *  .then(result => {
   *     console.log(`Supported video codec: ${result.video.join(',')}`);
   *     console.log(`Supported audio codec: ${result.audio.join(',')}`);
   *  });
   */
  getSupportedCodec: (supportedCodecOptions?: {
    stream?: MediaStream;
  }) => Promise<object>;
  /**
   * Logs connection information and errors to the console during active periods of the Agora.io SDK.
   */
  Logger: typeof agoraSDK.Logger;
}
