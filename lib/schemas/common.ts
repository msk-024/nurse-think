import { z } from "zod";

// 共通入力
// 文字列を数値に変換

export const idParamSchema = z.object({
    id:z.coerce.number().int().positive(),
});

export type IdParam=z.infer<typeof idParamSchema>;