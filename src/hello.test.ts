import hello from './hello';

test('hello function', () => {
  expect(hello('world')).toBe('Hello, world!');
});
