import { getTooltipMsg } from '../../utils';

test('simple', () => {
  const expected = '🎖1 ⚔1 🛡1 ❤1';
  const received = getTooltipMsg({
    level: 1, attack: 1, defence: 1, health: 1,
  });
  expect(received).toBe(expected);
});

test('second', () => {
  const expected = '🎖12 ⚔100 🛡34 ❤75';
  const received = getTooltipMsg({
    level: 12, attack: 100, defence: 34, health: 75,
  });
  expect(received).toBe(expected);
});

test('excess', () => {
  const expected = '🎖1 ⚔1 🛡1 ❤1';
  const received = getTooltipMsg({
    level: 1, attack: 1, defence: 1, health: 1, name: 'Антон',
  });
  expect(received).toBe(expected);
});
