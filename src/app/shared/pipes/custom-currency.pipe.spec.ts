import { CustomCurrencyPipe } from './custom-currency.pipe';

describe('CustomUrrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
