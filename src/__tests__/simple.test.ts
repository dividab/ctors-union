import { ctorsUnion } from "../ctors-union";

describe("PdfExporter", () => {
  it("should not crash", () => {
    const action = ctorsUnion({});
    expect(action).toBeTruthy();
  });
});
