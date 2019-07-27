const MersenneTwister = require('../libraries/mersennetwister.js');

// Calculate a seed and log it for debugging purposes.
const seed = Math.floor(Math.random() * (500 - 1 + 1) + 1);
console.log('Map Seed: ' + seed);

const mersenneTwister = new MersenneTwister(seed);

/**
 * In this class are the functions stored that are being used in other functions.
 */
export class Utils {
  /**
   * Function to generate a random number between two values.
   *
   * @public
   *
   * @param {Number} from - The minimum number.
   * @param {Number} to - The maximum number.
   *
   * @return {Number} A random number between the two supplied values.
   */
  static randomNumber(from, to) {
    return Math.floor(mersenneTwister.random() * (to - from + 1) + from);
  }
}
