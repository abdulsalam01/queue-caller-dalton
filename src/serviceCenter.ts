import type { Customer } from './customer';
import type { Technician } from './technician';
import type { ServiceLogEntry } from './types';

export class ServiceCenter {
  private _name: string;
  private _address: string;
  private _technicians: Technician[];
  private _customers: Customer[];

  private _queueCursor = 0;
  private _serviceLog: ServiceLogEntry[] = [];

  constructor(name: string, address: string, technicians: Technician[], customers: Customer[]) {
    this._name = name;
    this._address = address;
    this._technicians = technicians;
    this._customers = customers;
  }

  public get name(): string {
    return this._name;
  }

  public get address(): string {
    return this._address;
  }

  public get serviceLog(): readonly ServiceLogEntry[] {
    return this._serviceLog;
  }

  private nextCustomer(): Customer | null {
    if (this._queueCursor >= this._customers.length) return null;
    const customer = this._customers[this._queueCursor];
    this._queueCursor += 1;
    return customer;
  }

  /**
   * Recursive worker: technician keeps pulling next customer until queue is empty.
   */
  private async processNext(technician: Technician): Promise<void> {
    const customer = this.nextCustomer();
    if (!customer) return;

    console.log(`>> Technician ${technician.name} is repairing ${customer.name}'s phone. Customer phone is ${customer.phoneSeries} series <<`);

    await technician.repairing(customer);

    console.log(`\tREPAIRING DONE: ${technician.name} FIXED ${customer.name}'s phone!`);

    this._serviceLog.push({
      customerName: customer.name,
      phone: customer.phoneSeries,
      phoneRepairedBy: technician.name
    });

    console.log(`\n${technician.name} available, call another customer...`);

    // recursion is mandatory: call itself to fetch/process the next customer
    return this.processNext(technician);
  }

  public async startOperating(): Promise<ServiceLogEntry[]> {
    // Start both technicians simultaneously
    await Promise.all(this._technicians.map((t) => this.processNext(t)));

    console.log('\n\nService Center Log for today:\n');
    console.table(this._serviceLog);

    return this._serviceLog;
  }
}
