export default (ms: number): Promise<void> => {
  /**
   * Sleep for a given number of milliseconds.
   * @param {number} ms - The number of milliseconds to sleep.
   * @returns {Promise<void>} A promise that resolves after the specified time.
   */
  return new Promise((resolve) => setTimeout(resolve, ms));
};
