import { Customer } from './customer';
import { ServiceCenter } from './serviceCenter';
import { Technician } from './technician';
import { pickRandomPhoneSeries } from './utils';

// ====================================================================================
// MAIN
// ====================================================================================

// Define Technician (time scaling per test: 20min -> 25s, 10min -> 15s)
const dalton = new Technician('Dalton', 15);
const wapol = new Technician('Wapol', 25);
const technicians = [dalton, wapol];

// Define Customer - Generate 10 customers
const customers: Customer[] = new Array(10).fill(null).map((_, index) => {
  return new Customer(`Customer ${index}`, pickRandomPhoneSeries());
});

// Define Service Center
const serviceCenter = new ServiceCenter('First Service Center', 'Long Ring Long Land Street', technicians, customers);

console.log('Customer on queue:');
console.table(customers.map((c) => ({ name: c.name, phoneSeries: c.phoneSeries })));
console.log('\n');

console.log(`${serviceCenter.name} start operating today:`);
serviceCenter.startOperating().catch((err) => console.error(err));
