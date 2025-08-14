import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number | null, currencyCode: string = 'EGP'): string {
    if (value === null || value === undefined) return '';

    if (!value) return '';

    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${formatted} ${currencyCode} `;
  }
}
