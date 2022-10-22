import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

type FlatArray<T> = T extends Array<infer U> ? U[] : T[];
export type FormOptions<T, K extends keyof T> = {
  [key in keyof Pick<T, FormHasOptionKey<T, K>>]: FlatArray<NonNullable<T[key]>>;
};

export type FormHasOptionKey<T, K extends keyof T> = keyof Pick<T, K>;

export const useFormBase = <FormInputDef extends FieldValues, HasOptionKeys extends keyof FormInputDef = never>(
  props: UseFormProps<FormInputDef> & {
    defaultValues: Partial<FormInputDef>;
  },
  formOptions: FormOptions<FormInputDef, FormHasOptionKey<FormInputDef, HasOptionKeys>>
) => {
  return {
    formOptions,
    ...useForm<FormInputDef>(props),
  };
};
