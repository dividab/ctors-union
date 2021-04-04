import { ctorsUnion, CtorsUnion } from "../ctors-union";

const Action = ctorsUnion({
  Foo: (foo: string) => ({ foo }),
  Bar: (bar: number) => ({ bar }),
  Curry: (one: string) => (two: number) => ({ one, two }),
});
type Action = CtorsUnion<typeof Action>;

export const fooAction = Action.Foo("myfoo");
export const barAction = Action.Bar(1);
export const curriedAction = Action.Curry("one");
export const curry: Action = curriedAction(2);

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
      const _ignored: never = action;
      break;
    }
  }
}
