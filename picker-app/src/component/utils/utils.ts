export function compareByKey<T>(idKey?: keyof T): (a: T, b: T) => boolean {
  return (a, b) => (idKey ? a && b && a[idKey] === b[idKey] : a === b);
}

export function selectedByKey<T>(value: T, selectedValues: T[], idKey?: keyof T): boolean {
  return selectedValues.some(s => compareByKey(idKey)(value, s));
}

export function isValueEmpty<T>(value: T | T[]): boolean {
  return Array.isArray(value) ? !!value?.length : !!value;
}

export function createValueLabel<T>(value: T | T[], labelKey?: keyof T): string {
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
