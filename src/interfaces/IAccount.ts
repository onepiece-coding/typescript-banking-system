export interface IAccount {
  id: string;
  customerId: string;
  balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}
