import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const expectedTotal =
      type === 'income' ? balance.total + value : balance.total - value;

    if (expectedTotal < 0) {
      throw Error('Invalid and negative balance');
    }

    const transation = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transation;
  }
}

export default CreateTransactionService;
