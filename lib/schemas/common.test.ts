import { describe, expect, it } from "vitest";
import { idParamSchema } from "./common";

describe("idParamSchema", () => {
  it("coerces a numeric string route param", () => {
    expect(idParamSchema.parse({ id: "42" })).toEqual({ id: 42 });
  });

  it("accepts an actual number", () => {
    expect(idParamSchema.parse({ id: 7 })).toEqual({ id: 7 });
  });

  it.each(["abc", "1.5", "0", "-3", ""])("rejects %j", (raw) => {
    expect(idParamSchema.safeParse({ id: raw }).success).toBe(false);
  });

  it("rejects a missing id", () => {
    expect(idParamSchema.safeParse({}).success).toBe(false);
  });
});
