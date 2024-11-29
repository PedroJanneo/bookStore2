interface Transaction {
  id: number;
  datePurchase: string; // Utilizando o tipo Date para representar a data
  price: number;
  bookId: number;
  clientId: number;
}

export default Transaction;