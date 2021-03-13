import {calcTileType} from '../../utils';

test('top-left', () => {
  const received = 'top-left';
  const expected = calcTileType(0, 3)
  expect(expected).toBe(received);
});

test('top', () => {
  const received = 'top';
  const expected = calcTileType(1, 3)
  expect(expected).toBe(received);
});

test('top-right', () => {
  const received = 'top-right';
  const expected = calcTileType(2, 3)
  expect(expected).toBe(received);
});

test('left', () => {
  const received = 'left';
  const expected = calcTileType(3, 3)
  expect(expected).toBe(received);
});

test('center', () => {
  const received = 'center';
  const expected = calcTileType(4, 3)
  expect(expected).toBe(received);
});

test('right', () => {
  const received = 'right';
  const expected = calcTileType(5, 3)
  expect(expected).toBe(received);
});

test('bottom-left', () => {
  const received = 'bottom-left';
  const expected = calcTileType(6, 3)
  expect(expected).toBe(received);
});

test('bottom', () => {
  const received = 'bottom';
  const expected = calcTileType(7, 3)
  expect(expected).toBe(received);
});

test('bottom-right', () => {
  const received = 'bottom-right';
  const expected = calcTileType(8, 3)
  expect(expected).toBe(received);
});
