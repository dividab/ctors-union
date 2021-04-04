import { CtorsUnion, ctorsUnion, ctorsUnionWithTypeKey } from "../ctors-union";

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
