export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";

export interface ITransaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  date: Date;
  description: string;
}
