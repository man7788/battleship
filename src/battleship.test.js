/* eslint-disable no-undef */
import Ship from './ship';

it('should return ship length', () => {
  expect(Ship(3, null, null).length).toBe(3);
});

it('should return ship hits', () => {
  expect(Ship(null, 1, null).hits).toBe(1);
});

it('should return ship been sunk or not', () => {
  expect(Ship(null, null, false).sunk).toBeFalsy();
});
