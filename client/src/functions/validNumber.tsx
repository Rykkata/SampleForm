export default function validNumber<T>({ value }: {
    value: string;
  }): boolean {
    return (!isNaN(Number(value)));
  }