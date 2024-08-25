import { UuidFactory } from "@/utils/uuid";

export class UserId {
  constructor(public value = UuidFactory.generate()) {
    if (!UuidFactory.validate(value)) {
      throw new Error("IDの形式が正しくありません");
    }
  }
}
