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
