import { CtorsUnion, ctorsUnion, ctorsUnionWithTypeKey } from "../ctors-union";

describe("Simple", () => {
  it("should not crash", () => {
    const action = ctorsUnion({});
    expect(action).toBeTruthy();
  });
  it("should create action", () => {
    const Action = ctorsUnion({
      Foo: (foo: string) => ({ foo }),
      Bar: (bar: number) => ({ bar }),
      Curry: (one: string) => (two: number) => ({ one, two }),
    });
    type Action = CtorsUnion<typeof Action>;
    const fooAction = Action.Foo("myfoo");
    expect(fooAction).toEqual({ type: "Foo", foo: "myfoo" });
  });
  it("should create action with other type key", () => {
    const Action = ctorsUnionWithTypeKey("tag", {
      Foo: (foo: string) => ({ foo }),
      Bar: (bar: number) => ({ bar }),
      Curry: (one: string) => (two: number) => ({ one, two }),
    });
    type Action = CtorsUnion<typeof Action>;
    const fooAction = Action.Foo("myfoo");
    expect(fooAction).toEqual({ tag: "Foo", foo: "myfoo" });
    // Check that the types allow us to access .tag
    expect(fooAction.tag).toEqual("Foo");
  });
});
