import { delay } from './utils';
import type { Customer } from './customer';

export class Technician {
  private _name: string;
  private _averageRepairTimeSec: number;

  constructor(name: string, averageRepairTimeSec: number) {
    this._name = name;
    this._averageRepairTimeSec = averageRepairTimeSec;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set averageRepairTime(averageRepairTimeSec: number) {
    this._averageRepairTimeSec = averageRepairTimeSec;
  }

  public get averageRepairTime(): number {
    return this._averageRepairTimeSec;
  }

  public async repairing(customer: Customer): Promise<Customer> {
    await delay(this._averageRepairTimeSec * 1000);
    return customer;
  }
}
