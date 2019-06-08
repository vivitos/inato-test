import { Drug, Pharmacy } from "./pharmacy";

//TODO : Add tests for each particular drugs
//TODO : Add tests for benefits and expiresIn values

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateDrugs()).toEqual([
      new Drug("test", 1, 2)
    ]);
  });
});
