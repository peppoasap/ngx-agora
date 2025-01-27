/**
 * Allowed logging levels for the AgoraRTC.Logger module.
 */
export enum LogLevel {
  /** Outputs all logs. */
  Debug = 0,
  /** Outputs logs of the INFO, WARNING and ERROR levels. */
  Info = 1,
  /** Outputs logs of the WARNING and ERROR levels. */
  Warning = 2,
  /** Outputs logs of the ERROR level. */
  Error = 3,
  /** Outputs no logs. */
  None = 4
}
