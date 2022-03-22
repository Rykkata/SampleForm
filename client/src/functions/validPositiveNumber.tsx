import validNumber from "./validNumber";

export default function validWholeNumber({ value }: {
    value: string;
  }): boolean {
    return validNumber({ value }) && value as unknown as number > 0;
}