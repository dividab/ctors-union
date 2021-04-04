// These types are only used to satisfy the constraints needed for ReturnType<T> and Parameters<T>
export type RawMap = { readonly [key: string]: RawFn };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RawFn = (...args: readonly unknown[]) => any;

// These types are for the constructors map
export type CtorsMap<T extends RawMap, TTypeKey extends string> = {
  readonly [P in keyof T]: CtorFn<P, T[P], TTypeKey>;
};
export type CtorFn<TType, TCtorFn extends RawFn, TTypeKey extends string> = (
  ...args: Parameters<TCtorFn>
) => ReturnType<TCtorFn> extends RawFn
  ? CtorFn<TType, ReturnType<TCtorFn>, TTypeKey>
  : { readonly [k in TTypeKey]: TType } & ReturnType<TCtorFn>;

// This type will create the union type from the constructors map
export type CtorsUnion<A extends RawMap> = FinalReturn<ReturnType<A[keyof A]>>;
export type FinalReturn<T> = T extends RawFn ? FinalReturn<ReturnType<T>> : T;

/**
 * To support currying, recursively wrap constructor functions as long as they
 * return other functions until an object is returned, then add type to that
 * object and return it.
 */
const wrapIt = (typeKey: string, key: string, fn: RawFn) => (
  ...args: unknown[]
) => {
  const theReturn = fn(...args);
  return typeof theReturn === "function"
    ? wrapIt(typeKey, key, theReturn)
    : { [typeKey]: key, ...theReturn };
};

/**
 * Create a union type from an object with constructor functions.
 */
export function ctorsUnionWithTypeKey<
  T extends RawMap,
  TTypeKey extends string
>(typeKey: TTypeKey, ctorsMap: T): CtorsMap<T, TTypeKey> {
  // Transform functions to add key as "type" property in constructed object
  const withType = Object.fromEntries(
    Object.entries(ctorsMap).map(([key, value]) => [
      key,
      wrapIt(typeKey, key, value),
    ])
  );
  return withType as CtorsMap<T, TTypeKey>;
}

/**
 * Shortcut to use "type" as type-key
 */
export const ctorsUnion = <T extends RawMap>(
  ctorsMap: T
): CtorsMap<T, "type"> => ctorsUnionWithTypeKey("type", ctorsMap);

// Exmaple usage
const Action = ctorsUnion({
  Foo: (olle: string) => ({ olle }),
  Bar: (kalle: number) => ({ kalle }),
  Curry: (a: number) => (b: number) => ({ a, b }),
});
type Action = CtorsUnion<typeof Action>;
export const nisse = Action.Foo("sdaf");
export const kalle = Action.Bar(1);
export const curry1 = Action.Curry(1);
export const curry2: Action = curry1(2);
export const action: Action = Action.Foo("sadfsdf");
export const action2: Action = Action.Curry(1)(2);

export function update(action: Action): void {
  switch (action.type) {
    case "Foo": {
      break;
    }
    case "Bar": {
      break;
    }
    case "Curry": {
      break;
    }
    default: {
      const _ignored_x: never = action;
      break;
    }
  }
}

export const Action2 = ctorsUnionWithTypeKey("type3", {
  Foo: (olle: string) => ({ olle }),
  Bar: (kalle: number) => ({ kalle }),
  Curry: (a: number) => (b: number) => ({ a, b }),
});
export type Action2 = CtorsUnion<typeof Action2>;
export const nisse2 = Action.Foo("sdaf");
export const kalle2 = Action.Bar(1);

export function update2(action: Action2): void {
  switch (action.type3) {
    case "Foo": {
      break;
    }
    case "Bar": {
      break;
    }
    case "Curry": {
      break;
    }
    default: {
      const _ignored_x: never = action;
      break;
    }
  }
}
