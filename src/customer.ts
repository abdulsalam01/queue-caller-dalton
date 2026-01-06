import type { PhoneSeries } from './types';

export class Customer {
  private _name: string;
  private _phoneSeries: PhoneSeries;

  constructor(name: string, phoneSeries: PhoneSeries) {
    this._name = name;
    this._phoneSeries = phoneSeries;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set phoneSeries(phoneSeries: PhoneSeries) {
    this._phoneSeries = phoneSeries;
  }

  public get phoneSeries(): PhoneSeries {
    return this._phoneSeries;
  }
}
