// ドメインエラーの階層
// 何の種類の失敗か分からない問題の解決用の純粋モジュール
// HTTPレスポンスへのマッピングはsrc/lib/api/respond.tsで実施。

export const ERROR_CODES = [
  "VALIDATION_ERROR",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "EVALUATION_UNAVAILABLE",
  "INTERNAL_ERROR",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export abstract class AppError extends Error {
  abstract readonly status: number;
  abstract readonly code: ErrorCode;

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
// バリデーションに失敗
export class ValidationError extends AppError {
  readonly status: number = 400;
  readonly code = "VALIDATION_ERROR" as const;

  constructor(
    message: string,
    readonly issues: ReadonlyArray<{ path: string; message: string }> = [],
  ) {
    super(message);
  }
}

// 認証失敗
export class UnauthorizedError extends AppError {
  readonly status = 401;
  readonly code = "UNAUTHORIZED" as const;

  constructor(message = "Authentication required") {
    super(message);
  }
}
// 403
export class ForbiddenError extends AppError {
  readonly status = 403;
  readonly code = "FORBIDDEN" as const;

  constructor(message = "You do not have access to this resource") {
    super(message);
  }
}

// 404
export class NotFoundError extends AppError {
  readonly status = 404;
  readonly code = "NOT_FOUND" as const;

  constructor(resource: string, id?: number | string) {
    super(
      id === undefined
        ? `${resource} not found`
        : `${resource} ${id} not found`,
    );
  }
}

// 503
export class EvaluationUnavailableError extends AppError {
  readonly status = 503;
  readonly code = "EVALUATION_UNAVAILABLE" as const;

  constructor(
    message = "AI evaluation is temporarily unavailable.Please try again later.",
  ) {
    super(message);
  }
}

// その他：500
export class InternalError extends AppError {
  readonly status=500;
  readonly code="INTERNAL_ERROR"as const;

  constructor(message="Internal server error"){
    super(message);
  }
}

export function isAppError(error:unknown):error is AppError{
  return error instanceof AppError;
}