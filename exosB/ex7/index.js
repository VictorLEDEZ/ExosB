'use strict';

const computeNotes = (arr) =>
  (arr.reduce((acc, note) => note + acc) / arr.length).toFixed(2);

console.log(computeNotes([10, 13, 13, 12, 15, 12, 11, 16, 14]));
