export function compareByKey<T>(idKey?: keyof T): (a: T, b: T) => boolean {
  return (a, b) => (idKey ? a && b && a[idKey] === b[idKey] : a === b);
}

export function selectedByKey<T>(value: T, selectedValues: T[], idKey?: keyof T): boolean {
  if (!selectedValues) {
    return false;
  }
  return selectedValues.some(s => compareByKey(idKey)(value, s));
}

export function isValueExist<T>(value?: T | T[]): boolean {
  if (value === undefined || value === null) {
    return false;
  }
  return Array.isArray(value) ? !!value?.length : !!value;
}

export function createValueLabel<T>(value?: T | T[], labelKey?: keyof T): string {
  if (!value) {
    return '';
  }
  return Array.isArray(value) ? value.map(v => getValueBykey(v, labelKey)).join(', ') : getValueBykey(value, labelKey);
}

export function getValueBykey<T>(value: T, labelKey?: keyof T): string {
  if (!value) {
    return '';
  }

  return labelKey ? getString(value[labelKey]) : getString(value);
}

export function getString<T>(value: T): string {
  return value?.toString() ?? JSON.stringify(value);
}
