# ctors-union

Define unions types via constructor functions

## How to install

```
npm install ctors-union --save
```

## Introduction

To create a union type for use with for example Redux actions you can do this:

```ts
type Action = Foo | Bar;

function Foo(foo: number) {
  return { type: "Foo", foo };
}

function Bar(bar: string) {
  return { type: "Bar", bar };
}

function Curry(one: string) {
  return function (two: number) {
    return { type: "Bar", one, two };
  };
}
```

When you have many actions this code can take a lot of space. To shorten it you can use this library like this:

```ts
const Action = ctorsUnion({
  Foo: (olle: string) => ({ olle }),
  Bar: (kalle: number) => ({ kalle }),
  Curry: (one: string) => (two: number) => ({ one, two }),
});
type Action = CtorsUnion<typeof Action>;
```

With this in place you can construct values for each type and discriminate them in a switch statement like this:

```ts
export const fooAction = Action.Foo("myfoo");
export const barAction = Action.Bar(1);
export const curriedAction = Action.Curry(1);
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
```
