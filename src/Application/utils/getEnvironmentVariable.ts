/**
 * Fetches an environment variable value.
 * @param {string} variable - The name of the environment variable to fetch.
 * @returns {string} Returns the environment variable value.
 * @throws Throws an error if the value doesn't exist.
 */
export default (variable: string): string => {
  const value: string | undefined = process.env[variable];
  if (!value) {
    throw new Error(`Missing environment variable ${variable}`);
  }
  return value;
};