import { randInt } from '../../utils';

test('max - 0, min - 0', () => {
  const expectedMax = 0;
  const expectedMin = 0;
  const received = randInt(0);
  const receivedCompare = ((received >= expectedMin) && (received <= expectedMax));
  expect(receivedCompare).toBeTruthy();
});

test('max - 10, min - 0', () => {
  const expectedMax = 10;
  const expectedMin = 0;
  const received = randInt(10);
  const receivedCompare = ((received >= expectedMin) && (received <= expectedMax));
  expect(receivedCompare).toBeTruthy();
});

test('max - 2000, min - 1000', () => {
  const expectedMax = 2000;
  const expectedMin = 1000;
  const received = randInt(2000, 1000);
  const receivedCompare = ((received >= expectedMin) && (received <= expectedMax));
  expect(receivedCompare).toBeTruthy();
});
