/**
 * Shuffles characters in a string to create a randomized output.
 * @param input - The input string to shuffle.
 * @returns A string with shuffled characters.
 */
const shuffleString = (input: string): string => {
  const shuffleRatio = Math.random() * 0.8;
  let characters = input.split('');
  characters = characters.sort(() => Math.random() - shuffleRatio);
  return characters.join('');
};

/**
 * Generates a unique identifier based on the provided type.
 * @param type - The type of identifier.
 * @returns A unique identifier string.
 */
export const IdGen = (type?: string): string => {
  const characters = shuffleString(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  );
  const length = Math.floor(Math.random() * 6) + 5;
  const usedChars: string[] = [];
  let result = '';
  for (let i = 0; i < length; i++) {
    let index: number;
    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));
    result += characters[index];
    usedChars.push(characters[index]);
  }
  if (type) {
    return `${type}${result}`;
  }

  return result;
};
