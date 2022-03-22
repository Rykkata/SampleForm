import validNumber from "./validNumber";

export default function validWholeNumber<T>({ value }: {
    value: T;
  }): boolean {
    return validNumber({ value }) && value as unknown as number > 0;
}