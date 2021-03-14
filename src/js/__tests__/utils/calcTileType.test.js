import {calcTileType} from '../../utils';

test('top-left', () => {
  const expected = 'top-left';
  const received = calcTileType(0, 3);
  expect(received).toBe(expected);
});

test('top', () => {
  const expected = 'top';
  const received = calcTileType(1, 3);
  expect(received).toBe(expected);
});

test('top-right', () => {
  const expected = 'top-right';
  const received = calcTileType(2, 3);
  expect(received).toBe(expected);
});

test('left', () => {
  const expected = 'left';
  const received = calcTileType(3, 3);
  expect(received).toBe(expected);
});

test('center', () => {
  const expected = 'center';
  const received = calcTileType(4, 3);
  expect(received).toBe(expected);
});

test('right', () => {
  const expected = 'right';
  const received = calcTileType(5, 3);
  expect(received).toBe(expected);
});

test('bottom-left', () => {
  const expected = 'bottom-left';
  const received = calcTileType(6, 3);
  expect(received).toBe(expected);
});

test('bottom', () => {
  const expected = 'bottom';
  const received = calcTileType(7, 3);
  expect(received).toBe(expected);
});

test('bottom-right', () => {
  const expected = 'bottom-right';
  const received = calcTileType(8, 3);
  expect(received).toBe(expected);
});
