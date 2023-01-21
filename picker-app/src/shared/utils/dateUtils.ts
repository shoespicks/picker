// 日付をYYYY-MM-DD形式で返す HTML標準のinput要素はこの形式で日付文字列を扱う
export const createDateStringForInputElement = (date: Date): string | undefined => {
  return date?.toISOString().substring(0, 10);
};
