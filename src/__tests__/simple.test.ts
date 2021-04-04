import { ctorsUnion } from "../ctors-union";

describe("Simple", () => {
  it("should not crash", () => {
    const action = ctorsUnion({});
    expect(action).toBeTruthy();
  });
});
