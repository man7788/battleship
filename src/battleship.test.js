/* eslint-disable no-undef */
import Ship from './ship';

it('should return ship name', () => {
  expect(Ship('Foo').name).toBe('Foo');
});
