const assert = require('assert');
const { encrypt, decrypt, computeStreak } = require('../pwa/app.js');

// encryption is identity for now
const msg = 'hello';
assert.strictEqual(decrypt(encrypt(msg)), msg);

// streak calculation
const entries = [
  { date: new Date('2024-01-03').toISOString() },
  { date: new Date('2024-01-02').toISOString() },
  { date: new Date('2024-01-01').toISOString() }
];
assert.strictEqual(computeStreak(entries), 3);

const gapEntries = [
  { date: new Date('2024-01-03').toISOString() },
  { date: new Date('2024-01-01').toISOString() }
];
assert.strictEqual(computeStreak(gapEntries), 1);

console.log('All tests passed.');
