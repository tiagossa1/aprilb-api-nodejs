import {
  getFeeSchema,
  createFeeSchema,
  updateFeeSchema,
  deleteFeeSchema,
} from "../src/validations/schemas/fee";
import { expect } from "chai";
import { describe } from "mocha";

const OBJECT_PROPERTY_NAME_KEYS = {
  memberName: "memberName",
  showFeesMissingSchedule: "showFeesMissingSchedule",
  showFeesOnSchedule: "showFeesOnSchedule",
  year: "year",
  paidAmount: "paidAmount",
  memberId: "memberId",
  id: "id",
};

const STRING_MORE_THAN_255_CHARACTERS =
  "9hSxjlAMRUicSwJtANEbKuVuSX6tSMi7sEbw7R7EscXrYRdJr5ZAVoogRktla7TL5ENznBtcMHVdDwY7TgIXnfDaWhNxqqaVamF58oVS65O77kymnm0zbcnSHbXivQJ5yKUQTp9NVDqUzfOEw5fpLm3OgrdtVnndOwCCsOyqRngEhrXOFKtERH8Qq78eNNZZdaJAVPk0CCuU7iKh2KOciiZYEcPZFWila5PZW6x79kEaN7S9aVfCvDmb1sxKHGD2";

describe("Fee validation tests - GET FEE SCHEMA", () => {
  it("should not pass due to null object", () => {
    const result = getFeeSchema.validate(null, { abortEarly: false });
    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = getFeeSchema.validate({}, { abortEarly: false });
    expect(result.error?.details).to.not.be.null;
  });

  it("should pass due to null memberName", () => {
    const result = getFeeSchema.validate(
      {
        filters: {
          memberName: null,
        },
      },
      { abortEarly: false }
    );

    expect(result.error?.details).to.be.undefined;
  });

  it("should pass due to empty memberName", () => {
    const result = getFeeSchema.validate(
      {
        filters: {
          memberName: "",
        },
      },
      { abortEarly: false }
    );

    expect(result.error?.details).to.be.undefined;
  });

  it("should not pass due to memberName have more than maximum length", () => {
    const result = getFeeSchema.validate(
      {
        filters: {
          memberName: STRING_MORE_THAN_255_CHARACTERS,
        },
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberName &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to undefined showFeesMissingSchedule", () => {
    const result = getFeeSchema.validate({
      filters: {
        showFeesMissingSchedule: undefined,
      },
    });

    expect(result.error?.details).to.be.undefined;
  });

  it("should pass due to NULL showFeesMissingSchedule", () => {
    const result = getFeeSchema.validate({
      filters: {
        showFeesMissingSchedule: null,
      },
    });

    expect(result.error?.details).to.be.undefined;
  });

  it("should pass due to falsy showFeesMissingSchedule", () => {
    const result = getFeeSchema.validate({
      filters: {
        showFeesMissingSchedule: false,
      },
    });

    expect(result.error?.details).to.be.undefined;
  });

  it("should pass due to truthy showFeesMissingSchedule", () => {
    const result = getFeeSchema.validate({
      filters: {
        showFeesMissingSchedule: true,
      },
    });

    expect(result.error?.details).to.be.undefined;
  });

  it("should pass due to NULL showFeesOnSchedule", () => {
    const result = getFeeSchema.validate({
      filters: {
        showFeesOnSchedule: null,
      },
    });

    expect(result.error?.details).to.be.undefined;
  });

  it("should pass due to falsy showFeesOnSchedule", () => {
    const result = getFeeSchema.validate({
      filters: {
        showFeesOnSchedule: false,
      },
    });

    expect(result.error?.details).to.be.undefined;
  });

  it("should pass due to truthy showFeesOnSchedule", () => {
    const result = getFeeSchema.validate({
      filters: {
        showFeesOnSchedule: true,
      },
    });

    expect(result.error?.details).to.be.undefined;
  });
});

describe("Fee validation tests - CREATE", () => {
  it("should not pass due to null object", () => {
    const result = createFeeSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.be.not.null;
  });

  it("should not pass due to empty object", () => {
    const result = createFeeSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.be.not.null;
  });

  it("should not pass due to NULL year", () => {
    const result = createFeeSchema.validate(
      {
        year: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to UNDEFINED year", () => {
    const result = createFeeSchema.validate(
      {
        year: undefined,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to year being less than minimum value", () => {
    const result = createFeeSchema.validate(
      {
        year: 2013,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year &&
          e.type === "number.min"
      )
    ).to.be.true;
  });

  it("should not pass due to year being bigger than maximum value", () => {
    const result = createFeeSchema.validate(
      {
        year: 2100,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year &&
          e.type === "number.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid year value", () => {
    const result = createFeeSchema.validate(
      {
        year: 2022,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year
      )
    ).to.be.false;
  });

  it("should not pass due to NULL paidAmount", () => {
    const result = createFeeSchema.validate(
      {
        paidAmount: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to UNDEFINED paidAmount", () => {
    const result = createFeeSchema.validate(
      {
        paidAmount: undefined,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative paidAmount", () => {
    const result = createFeeSchema.validate(
      {
        paidAmount: -1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero paidAmount", () => {
    const result = createFeeSchema.validate(
      {
        paidAmount: 0,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to valid paidAmount", () => {
    const result = createFeeSchema.validate(
      {
        paidAmount: 1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount
      )
    ).to.be.false;
  });

  it("should not pass due to NULL memberId", () => {
    const result = createFeeSchema.validate(
      {
        memberId: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to UNDEFINED memberId", () => {
    const result = createFeeSchema.validate(
      {
        memberId: undefined,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative memberId", () => {
    const result = createFeeSchema.validate(
      {
        memberId: -1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero memberId", () => {
    const result = createFeeSchema.validate(
      {
        memberId: 0,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to valid memberId", () => {
    const result = createFeeSchema.validate(
      {
        memberId: 1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId
      )
    ).to.be.false;
  });
});

describe("Fee validation tests - UPDATE", () => {
  it("should not pass due to null object", () => {
    const result = updateFeeSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.be.not.null;
  });

  it("should not pass due to empty object", () => {
    const result = updateFeeSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.be.not.null;
  });

  it("should not pass due to NULL id", () => {
    const result = updateFeeSchema.validate(
      {
        id: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to UNDEFINED id", () => {
    const result = updateFeeSchema.validate(
      {
        paidAmount: undefined,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative id", () => {
    const result = updateFeeSchema.validate(
      {
        id: -1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero id", () => {
    const result = updateFeeSchema.validate(
      {
        id: 0,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to valid id", () => {
    const result = updateFeeSchema.validate(
      {
        id: 1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id
      )
    ).to.be.false;
  });

  it("should not pass due to NULL year", () => {
    const result = updateFeeSchema.validate(
      {
        year: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to UNDEFINED year", () => {
    const result = updateFeeSchema.validate(
      {
        year: undefined,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to year being less than minimum value", () => {
    const result = updateFeeSchema.validate(
      {
        year: 2013,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year &&
          e.type === "number.min"
      )
    ).to.be.true;
  });

  it("should not pass due to year being bigger than maximum value", () => {
    const result = updateFeeSchema.validate(
      {
        year: 2100,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year &&
          e.type === "number.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid year value", () => {
    const result = updateFeeSchema.validate(
      {
        year: 2022,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.year
      )
    ).to.be.false;
  });

  it("should not pass due to NULL paidAmount", () => {
    const result = updateFeeSchema.validate(
      {
        paidAmount: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to UNDEFINED paidAmount", () => {
    const result = updateFeeSchema.validate(
      {
        paidAmount: undefined,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative paidAmount", () => {
    const result = updateFeeSchema.validate(
      {
        paidAmount: -1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero paidAmount", () => {
    const result = updateFeeSchema.validate(
      {
        paidAmount: 0,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to valid paidAmount", () => {
    const result = updateFeeSchema.validate(
      {
        paidAmount: 1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount
      )
    ).to.be.false;
  });

  it("should not pass due to NULL memberId", () => {
    const result = updateFeeSchema.validate(
      {
        memberId: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to UNDEFINED memberId", () => {
    const result = updateFeeSchema.validate(
      {
        memberId: undefined,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative memberId", () => {
    const result = updateFeeSchema.validate(
      {
        memberId: -1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero memberId", () => {
    const result = updateFeeSchema.validate(
      {
        memberId: 0,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to valid memberId", () => {
    const result = updateFeeSchema.validate(
      {
        memberId: 1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId
      )
    ).to.be.false;
  });
});

describe("Fee validation tests - DELETE", () => {
  it("should not pass due to null object", () => {
    const result = deleteFeeSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.be.not.null;
  });

  it("should not pass due to empty object", () => {
    const result = deleteFeeSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.be.not.null;
  });

  it("should not pass due to NULL id", () => {
    const result = deleteFeeSchema.validate(
      {
        id: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to UNDEFINED id", () => {
    const result = deleteFeeSchema.validate(
      {
        paidAmount: undefined,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative id", () => {
    const result = deleteFeeSchema.validate(
      {
        id: -1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero id", () => {
    const result = deleteFeeSchema.validate(
      {
        id: 0,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to valid id", () => {
    const result = deleteFeeSchema.validate(
      {
        id: 1,
      },
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.be.undefined;
  });
});
