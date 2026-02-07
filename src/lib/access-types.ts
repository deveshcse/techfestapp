import { ac } from "./permissions";

type AccessControl = typeof ac;

export type Resource = keyof AccessControl["statements"];

export type Action<R extends Resource> =
  AccessControl["statements"][R][number];
