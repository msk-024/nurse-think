import { describe, expect, it } from "vitest";
import {
  ForbiddenError,
  InternalError,
  isAppError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./errors";

describe("error hierarchy", () => {
  it("ValidationErrorはデフォルトでstatus 400と空のissuesを持つこと", () => {
    const error = new ValidationError("bad input");
    expect(error.status).toBe(400);
    expect(error.code).toBe("VALIDATION_ERROR");
    expect(error.issues).toEqual([]);
    expect(error.message).toBe("bad input");
  });

  it("ValidationErrorに渡したissuesがそのまま保持されること", () => {
    const issues = [{ path: "userAnswer", message: "too long" }];
    expect(new ValidationError("bad", issues).issues).toEqual(issues);
  });

  it("UnauthorizedErrorはデフォルトで401と汎用メッセージを持つこと", () => {
    const error = new UnauthorizedError();
    expect(error.code).toBe("UNAUTHORIZED");
    expect(error.status).toBe(401);
    expect(error.message).toBe("Authentication required");
  });

  it("ForbiddenErrorはstatus 403であること", () => {
    expect(new ForbiddenError().status).toBe(403);
  });

  it("NotFoundErrorはidを含めたメッセージを組み立てる", ()=>{
    const error= new NotFoundError("Case",42);
    expect(error.status).toBe(404);
    expect(error.message).toBe("Case 42 not found");
  });

  it("NotFoundErrorはid無しのメッセージを組み立てること",()=>{
    expect(new NotFoundError("Case").message).toBe("Case not found");
  });

  it("InternalErrorはstatus 500であること",()=>{
  expect(new InternalError().status).toBe(500);
  });

  it("エラーはnameプロパティでクラス名を公開すること",()=>{
expect(new NotFoundError("Case").name).toBe("NotFoundError");
  });
});

describe("isAppError",()=>{
  it("すべてのAppErrorサブクラスを受け入れること",()=>{
    expect(isAppError(new ValidationError("x"))).toBe(true);
    expect(isAppError(new NotFoundError("Case"))).toBe(true);
  });

  it("素のErrorやエラーでない値は拒否すること",()=>{
    expect(isAppError(new Error("x"))).toBe(false);
    expect(isAppError("string")).toBe(false);
    expect(isAppError(null)).toBe(false);
    })
})