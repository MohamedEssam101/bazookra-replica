import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  // default value for currencyCode is egp
  transform(
    value: number | undefined | null,
    currencyCode: string = 'EGP'
  ): string {
    if (value === null || value === undefined) return '';

    if (!value) return '';

    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${formatted} ${currencyCode} `;
  }
}
