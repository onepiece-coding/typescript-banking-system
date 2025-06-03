import { Customer } from "../models/Customer";
import { IdGenerator } from "../utils/IdGenerator";

// Manages customers in-memory
export class CustomerService {
  private customers: Map<string, Customer> = new Map();

  // Create a new customer and return it
  public createCustomer(name: string, email: string): Customer {
    const id = IdGenerator.generate();
    const customer = new Customer(id, name, email);
    this.customers.set(id, customer); // save customer to db
    return customer;
  }

  // Find a customer by ID
  public getCustomerById(id: string): Customer | undefined {
    return this.customers.get(id);
  }

  // List all customers
  public listCustomers(): Customer[] {
    return Array.from(this.customers.values());
  }
}
