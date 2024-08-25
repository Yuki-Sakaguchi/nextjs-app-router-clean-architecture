import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";

export type Uuid = string;

/**
 * UUIDv4のファクトリークラス
 * 直接 uuidv4 は呼ばず、これを使う
 */
export class UuidFactory {
  static generate(): Uuid {
    return uuidv4();
  }

  static validate(value: string | Uuid): boolean {
    return uuidValidate(value) && uuidVersion(value) === 4;
  }

  static toString(value: string | Uuid): string {
    if (!UuidFactory.validate(value)) {
      throw new Error("IDの形式が正しくありません");
    }
    return value as string;
  }
}
