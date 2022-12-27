export default interface Transaction {
  id: string;
  from: string;
  to: string;
  value: number;
  date: Date;
}
