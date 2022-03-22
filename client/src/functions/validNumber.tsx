export default function validNumber<T>({ value }: {
    value: T;
  }): boolean {
    return (typeof(value) === 'number');
  }