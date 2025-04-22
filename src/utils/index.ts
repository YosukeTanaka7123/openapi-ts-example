/**
 * プレフィックスに合致するプロパティのみを抽出する型ユーティリティ
 * @template T オブジェクト型
 * @template P プレフィックス（文字列リテラル型）
 * @example
 * type User = {
 *   id: number;
 *   userName: string;
 *   userEmail: string;
 *   age: number;
 * };
 *
 * // { userName: string; userEmail: string }
 * type UserProps = ExtractPrefixedProps<User, 'user'>;
 */
export type ExtractPrefixedProps<
  T extends Record<string, unknown>,
  P extends string,
> = {
  [K in keyof T as K extends string
    ? K extends `${P}${string}`
      ? K
      : never
    : never]: T[K];
};
