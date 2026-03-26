export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
  method: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed';
  description?: string;
  icon?: string;
  startDate?: string;
  frequency?: string;
  interestRate?: number;
  sourceAccount?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'warning' | 'success';
}
