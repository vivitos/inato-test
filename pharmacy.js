const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;
const DRUGS_SPECS = {
  "Herbal Tea": { benefits: [{ treshold: Infinity, benefitUpdate: 1 }] },
  Fervex: {
    benefits: [
      { treshold: Infinity, benefitUpdate: 1 },
      { treshold: 10, benefitUpdate: 2 },
      { treshold: 5, benefitUpdate: 3 },
      { treshold: 0, benefitUpdate: -Infinity }
    ]
  },
  "Magic Pill": {
    neverExpires: true,
    benefits: [{ treshold: Infinity, benefitUpdate: 0 }]
  },
  Dafalgan: { benefits: [{ treshold: Infinity, benefitUpdate: -2 }] },
  default: { benefits: [{ treshold: Infinity, benefitUpdate: -1 }] }
};

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  //TODO: Add comments
  updateBenefit(drug) {
    const { expiresIn, name } = drug;

    if (!Number.isFinite(expiresIn))
      throw new Error("Drug should have finite number as expiresIn");

    const benefitEvolutionSorted = (name in DRUGS_SPECS
      ? DRUGS_SPECS[name].benefits
      : DRUGS_SPECS["default"].benefits
    ).sort(
      (firstBenefit, secondBenefit) =>
        firstBenefit.treshold - secondBenefit.treshold
    );

    const neverExpires = (drug.name in DRUGS_SPECS
      ? DRUGS_SPECS[drug.name]
      : DRUGS_SPECS["default"]
    ).neverExpires;

    const { benefitUpdate } = benefitEvolutionSorted.find(
      ({ treshold }) => Math.min(treshold, expiresIn) === drug.expiresIn
    );

    const ratio = drug.expiresIn <= 0 && !neverExpires ? 2 : 1;
    const newBenefit = drug.benefit + ratio * benefitUpdate;

    if (newBenefit > MAX_BENEFIT) drug.benefit = MAX_BENEFIT;
    else if (newBenefit < MIN_BENEFIT) drug.benefit = MIN_BENEFIT;
    else drug.benefit = newBenefit;
  }

  //TODO: Add comments
  updateExpiresIn(drug) {
    const neverExpires = (drug.name in DRUGS_SPECS
      ? DRUGS_SPECS[drug.name]
      : DRUGS_SPECS["default"]
    ).neverExpires;

    if (!neverExpires) drug.expiresIn = drug.expiresIn - 1;
  }

  updateDrugs() {
    this.drugs.forEach(drug => {
      this.updateBenefit(drug);
      this.updateExpiresIn(drug);
    });

    return this.drugs;
  }
}
