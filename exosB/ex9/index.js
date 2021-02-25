'use strict';

/**
 * Checks if a word or a sentence is a palindrom
 * @param {string} str
 * @returns {boolean} true if it is and false if not
 */
function checkPalindrome(str) {
  const string = str.toUpperCase().split('');
  const stringLen = string.length;

  // Les mots doivent contenir au moins 3 characteres
  return string.every(
    (char, i, arr) => char === arr[stringLen - i - 1] && stringLen >= 3
  );
}

console.log(checkPalindrome('vi')); //false
console.log(checkPalindrome('lool')); //true
console.log(checkPalindrome('victor')); //false
console.log(checkPalindrome('victor victor')); //false
console.log(checkPalindrome('sexes')); //true
console.log(checkPalindrome('sexes sexes')); //true
console.log(checkPalindrome('   sexes sexes')); //false
