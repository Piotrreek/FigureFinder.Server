import { Schema } from "yup";

export type FormSchema<T> = {
  [K in keyof Required<T>]: Schema<T[K]>;
};
