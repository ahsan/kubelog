
/**
 * Connects logs source to the processor.
 * @param logsSource Source of the logs. Normally, stdin.
 */
export const initReader = (
  logsSource: NodeJS.ReadStream
): NodeJS.ReadStream => {
  logsSource.resume();
  logsSource.setEncoding('utf8');
  return logsSource;
}