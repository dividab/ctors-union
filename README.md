# ctors-union

Define unions types via constructor functions

## How to install

```
npm install ctors-union --save
```

## Introduction

To create a union type for use with for example Redux actions you can do this:

```ts
type Action = Foo | Bar | Curry;

type Foo = { type: "Foo"; foo: number };
type Bar = { type: "Bar"; bar: string };
type Curry = { type: "Curry"; one: string; two: number };

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

## How it works

The goal of this library is to add as little "magic" as possible but still cut down the bolierplate and support currying in the constructor functions. To acheive this we use one function `ctorsUnion` and one type `CtorsUnion<T>`.

### ctorsUnion

This function takes an object where each key is a string and the value is a function that contstucts an object. It returns the same object with the constructor functions wrapped so they produce objects that include the `type` key. The value of the `type` key will be the name of the key on which the function is located.

### CtorsUnion<T>

This type takes a type `T` that is an object where each key is a string and each value is a function that constructs an object. It returns a type that is a union of the return type of the constructor functions.

## Using different discriminator

If you don't want to use the key `type` as the discriminator you can use `ctorsUnionWithTypeKey` instead of `ctorsUnion`.
