import {
  createTripTypeSchema,
  updateTripTypeSchema,
  deleteTripTypeSchema,
} from "../src/validations/schemas/tripType";
import { expect } from "chai";
import { describe } from "mocha";

const OBJECT_PROPERTY_NAME_KEYS = {
  code: "code",
  name: "name",
};

const STRING_MAX_255_CHARACTERS =
  "UiBLPbF6Ygu4B6Yw1UsNsCaaGaMFMUBAz3QNqqdqdO1B9ZatVohupp2ysmJqHhyoHRTqpi4B9FAGvtKmGYgHTNs1LmO1IQp9dMuI9KhoDLf80ONll18U65d9XJV6ESuYFthWvMBtbu8cshFDV48Q3RktVRUyzBvGyuuJozv5ELVZqtS6AezubTs0ws78szYctAARNhvLvBK98jr6mYFEmcsHtn6Xc6tsYSVevEYsaSVpFLx2t4m3DNuUb2ntZGc5";

describe("Trip type validation tests - CREATE", () => {
  it("should not pass the validation due to empty object", () => {
    const result = createTripTypeSchema.validate({});
    expect(result.error).to.be.not.empty;
  });

  it("should not pass the validation due to null code", () => {
    const result = createTripTypeSchema.validate(
      {
        code: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to empty code", () => {
    const result = createTripTypeSchema.validate(
      {
        code: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to long code", () => {
    const result = createTripTypeSchema.validate(
      {
        code: STRING_MAX_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to null name", () => {
    const result = createTripTypeSchema.validate(
      {
        name: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to empty name", () => {
    const result = createTripTypeSchema.validate(
      {
        name: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to long name", () => {
    const result = createTripTypeSchema.validate(
      {
        name: STRING_MAX_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass the validation due to valid object", () => {
    const result = createTripTypeSchema.validate(
      {
        code: "Code",
        name: "Name",
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });
});

describe("Trip type validation tests - UPDATE", () => {
  it("should not pass the validation due to empty object", () => {
    const result = updateTripTypeSchema.validate({});
    expect(result.error).to.be.not.empty;
  });

  it("should not pass the validation due to null code", () => {
    const result = updateTripTypeSchema.validate(
      {
        code: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to empty code", () => {
    const result = updateTripTypeSchema.validate(
      {
        code: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to long code", () => {
    const result = updateTripTypeSchema.validate(
      {
        code: STRING_MAX_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to null name", () => {
    const result = updateTripTypeSchema.validate(
      {
        name: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to empty name", () => {
    const result = updateTripTypeSchema.validate(
      {
        name: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to long name", () => {
    const result = updateTripTypeSchema.validate(
      {
        name: STRING_MAX_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass the validation due to valid object", () => {
    const result = updateTripTypeSchema.validate(
      {
        code: "Code",
        name: "Name",
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });
});

describe("Trip type validation tests - DELETE", () => {
  it("should not pass the validation due to empty object", () => {
    const result = deleteTripTypeSchema.validate({});
    expect(result.error).to.be.not.empty;
  });

  it("should not pass the validation due to null code", () => {
    const result = deleteTripTypeSchema.validate(
      {
        code: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to undefined code", () => {
    const result = deleteTripTypeSchema.validate(
      {
        code: undefined,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to empty code", () => {
    const result = deleteTripTypeSchema.validate(
      {
        code: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass the validation due to long code", () => {
    const result = deleteTripTypeSchema.validate(
      {
        code: STRING_MAX_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.code &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass the validation due to valid object", () => {
    const result = deleteTripTypeSchema.validate(
      {
        code: "Code",
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });
});
