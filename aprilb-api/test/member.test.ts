import {
  validIndicatives as validLandlinePhoneIndicatives,
  createMemberSchema,
  deleteMemberSchema,
  getByIdSchema,
  getMemberSchema,
  updateMemberSchema,
} from "../src/validations/schemas/member";
import { expect } from "chai";
import { describe } from "mocha";

const OBJECT_PROPERTY_NAME_KEYS = {
  text: "text",
  id: "id",
  name: "name",
  address: "address",
  number: "number",
  landline_number: "landline_number",
  email: "email",
  skip: "skip",
  take: "take",
  filters: "filters",
};

const STRING_MORE_THAN_255_CHARACTERS =
  "9hSxjlAMRUicSwJtANEbKuVuSX6tSMi7sEbw7R7EscXrYRdJr5ZAVoogRktla7TL5ENznBtcMHVdDwY7TgIXnfDaWhNxqqaVamF58oVS65O77kymnm0zbcnSHbXivQJ5yKUQTp9NVDqUzfOEw5fpLm3OgrdtVnndOwCCsOyqRngEhrXOFKtERH8Qq78eNNZZdaJAVPk0CCuU7iKh2KOciiZYEcPZFWila5PZW6x79kEaN7S9aVfCvDmb1sxKHGD2";

describe("Member validation tests - GET", () => {
  it("should not pass due null object", () => {
    const result = getMemberSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = getMemberSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should pass due to null filters object", () => {
    const result = getMemberSchema.validate({
      filters: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.filters
      ) ?? false
    ).to.be.false;
  });

  it("should pass due to empty filters object", () => {
    const result = getMemberSchema.validate({
      filters: {},
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.filters
      ) ?? false
    ).to.be.false;
  });

  it("should pass due to null text", () => {
    const result = getMemberSchema.validate({
      filters: {
        text: null,
      },
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.text
      ) ?? false
    ).to.be.false;
  });

  it("should pass due to empty text", () => {
    const result = getMemberSchema.validate({
      filters: {
        text: "",
      },
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.text
      ) ?? false
    ).to.be.false;
  });

  it("should not pass due to text being more than maximum length", () => {
    const result = getMemberSchema.validate({
      filters: {
        text: STRING_MORE_THAN_255_CHARACTERS,
      },
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.text &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid text", () => {
    const result = getMemberSchema.validate({
      filters: {
        text: "John Smith",
      },
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.text
      ) ?? false
    ).to.be.false;
  });
});

describe("Member validation tests - GET BY ID", () => {
  it("should not pass due null object", () => {
    const result = getByIdSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = getByIdSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to null id", () => {
    const result = getByIdSchema.validate({
      id: null,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to undefined id", () => {
    const result = getByIdSchema.validate({
      id: undefined,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative id", () => {
    const result = getByIdSchema.validate({
      id: -1,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero id", () => {
    const result = getByIdSchema.validate({
      id: 0,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to positive id", () => {
    const result = getByIdSchema.validate({
      id: 1,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id
      ) ?? false
    ).to.be.false;
  });
});

describe("Member validation tests - CREATE", () => {
  it("should not pass due null object", () => {
    const result = createMemberSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = createMemberSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should pass due to null id", () => {
    const result = createMemberSchema.validate({
      id: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id
      )
    ).to.be.false;
  });

  it("should not pass due to undefined id", () => {
    const result = getByIdSchema.validate({
      id: undefined,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          (e.type === "string.base" || e.type === "any.required")
      )
    ).to.be.true;
  });

  it("should not pass due to negative id", () => {
    const result = createMemberSchema.validate({
      id: -1,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero id", () => {
    const result = createMemberSchema.validate({
      id: 0,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to positive id", () => {
    const result = createMemberSchema.validate({
      id: 1,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id
      )
    ).to.be.false;
  });

  it("should not pass due to null name", () => {
    const result = createMemberSchema.validate({
      name: null,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty name", () => {
    const result = createMemberSchema.validate({
      name: "",
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due name being more than maximum characters", () => {
    const result = createMemberSchema.validate({
      name: STRING_MORE_THAN_255_CHARACTERS,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid name", () => {
    const result = createMemberSchema.validate({
      name: "John Smith",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });

  it("should not pass due to null address", () => {
    const result = createMemberSchema.validate(
      {
        address: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty address", () => {
    const result = createMemberSchema.validate(
      {
        address: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due address being more than maximum characters", () => {
    const result = createMemberSchema.validate(
      {
        address: STRING_MORE_THAN_255_CHARACTERS,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid address", () => {
    const result = createMemberSchema.validate({
      address: "Some street goes here",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address
      )
    ).to.be.false;
  });

  it("should not pass due to null number", () => {
    const result = createMemberSchema.validate(
      {
        number: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          (e.type === "any.required" || e.type === "string.base")
      )
    ).to.be.true;
  });

  it("should not pass due to empty number", () => {
    const result = createMemberSchema.validate(
      {
        number: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          (e.type === "string.base" ||
            e.type === "any.required" ||
            e.type === "string.empty")
      )
    ).to.be.true;
  });

  it("should not pass due to 8 length number", () => {
    const result = createMemberSchema.validate(
      {
        number: "93647584",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          e.type === "string.length"
      )
    ).to.be.true;
  });

  it("should not pass due to incorrect number indicative", () => {
    const result = createMemberSchema.validate(
      {
        number: "906475843",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          e.type === "custom"
      )
    ).to.be.true;
  });

  it("should not pass due number being more than maximum characters", () => {
    const result = createMemberSchema.validate(
      {
        number: STRING_MORE_THAN_255_CHARACTERS,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          e.type === "string.length"
      )
    ).to.be.true;
  });

  it("should not pass due to number being landline number", () => {
    const result = createMemberSchema.validate(
      {
        number: "253849954",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          e.type === "custom"
      )
    ).to.be.true;
  });

  it("should be required when landline_number is null/empty", () => {
    const result = createMemberSchema.validate(
      {
        number: "",
        landline_number: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should pass due to valid number - 91", () => {
    const result = createMemberSchema.validate({
      address: "915465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 92", () => {
    const result = createMemberSchema.validate({
      address: "925465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 93", () => {
    const result = createMemberSchema.validate({
      address: "935465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 96", () => {
    const result = createMemberSchema.validate({
      address: "965465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should not pass due to null landline_number", () => {
    const result = createMemberSchema.validate(
      {
        landline_number: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty landline_number", () => {
    const result = createMemberSchema.validate(
      {
        landline_number: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due to 8 length landline_number", () => {
    const result = createMemberSchema.validate(
      {
        landline_number: "25364734",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "string.length"
      )
    ).to.be.true;
  });

  it("should not pass due landline_number being more than maximum characters", () => {
    const result = createMemberSchema.validate(
      {
        landline_number: "2536475843",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "string.length"
      )
    ).to.be.true;
  });

  it("should not pass due to landline_number being number", () => {
    const result = createMemberSchema.validate(
      {
        landline_number: "936475849",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "custom"
      )
    ).to.be.true;
  });

  it("should be required when landline_number is null/empty", () => {
    const result = createMemberSchema.validate(
      {
        landline_number: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  validLandlinePhoneIndicatives.forEach((indicative) => {
    it(`should pass due to valid landline_phone - ${indicative}`, () => {
      const result = createMemberSchema.validate(
        {
          landline_phone: indicative + "748594",
        },
        {
          abortEarly: false,
        }
      );

      expect(
        result.error?.details.some(
          (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number
        )
      ).to.be.false;
    });
  });

  ["email@-example.com", "plainaddress", "@example.com"].forEach(
    (invalidEmail) => {
      it(`should not pass due to not being a invalid email - ${invalidEmail}`, () => {
        const result = createMemberSchema.validate(
          {
            email: invalidEmail,
          },
          {
            abortEarly: false,
          }
        );

        expect(
          result.error?.details.some(
            (e) =>
              e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email &&
              e.type === "string.email"
          )
        ).to.be.true;
      });
    }
  );

  it("should not pass due to email being more than maximum length", () => {
    const result = createMemberSchema.validate(
      {
        email: STRING_MORE_THAN_255_CHARACTERS,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to null email", () => {
    const result = createMemberSchema.validate(
      {
        email: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email
      )
    ).to.be.false;
  });

  it("should pass due to empty email", () => {
    const result = createMemberSchema.validate(
      {
        email: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email
      )
    ).to.be.false;
  });

  it("should pass due to white space email", () => {
    const result = createMemberSchema.validate(
      {
        email: "              ",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email
      )
    ).to.be.false;
  });

  it("should not pass due to negative skip", () => {
    const result = createMemberSchema.validate(
      {
        skip: -1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.skip &&
          e.type === "number.min"
      )
    ).to.be.true;
  });

  it("should pass due to zero skip", () => {
    const result = createMemberSchema.validate(
      {
        skip: 0,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.skip &&
          e.type === "number.positive"
      )
    ).to.be.false;
  });

  it("should pass due to null skip", () => {
    const result = createMemberSchema.validate(
      {
        skip: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.skip
      )
    ).to.be.false;
  });

  it("should pass due to empty skip", () => {
    const result = createMemberSchema.validate(
      {
        skip: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.skip
      )
    ).to.be.false;
  });

  it("should pass due to valid skip", () => {
    const result = createMemberSchema.validate(
      {
        skip: 1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.skip
      )
    ).to.be.false;
  });

  it("should not pass due to negative take", () => {
    const result = createMemberSchema.validate(
      {
        take: -1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.take &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero take", () => {
    const result = createMemberSchema.validate(
      {
        take: 0,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.take &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to null take", () => {
    const result = createMemberSchema.validate(
      {
        take: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.take
      )
    ).to.be.false;
  });

  it("should pass due to empty take", () => {
    const result = createMemberSchema.validate(
      {
        take: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.take
      )
    ).to.be.false;
  });

  it("should pass due to valid take", () => {
    const result = createMemberSchema.validate(
      {
        take: 1,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.take
      )
    ).to.be.false;
  });
});

describe("Member validation tests - UPDATE", () => {
  it("should not pass due null object", () => {
    const result = updateMemberSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = updateMemberSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to null id", () => {
    const result = updateMemberSchema.validate({
      id: null,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to undefined id", () => {
    const result = updateMemberSchema.validate({
      id: undefined,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative id", () => {
    const result = updateMemberSchema.validate({
      id: -1,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero id", () => {
    const result = updateMemberSchema.validate({
      id: 0,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to positive id", () => {
    const result = updateMemberSchema.validate({
      id: 1,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id
      ) ?? false
    ).to.be.false;
  });

  it("should pass due to null name", () => {
    const result = updateMemberSchema.validate({
      name: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });

  it("should pass due to empty name", () => {
    const result = updateMemberSchema.validate({
      name: "",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });

  // it("should not pass due name being more than maximum characters", () => {
  //   const result = updateMemberSchema.validate({
  //     name: STRING_MORE_THAN_255_CHARACTERS,
  //   });

  //   console.log(result.error?.details)

  //   expect(
  //     result.error?.details.some(
  //       (e) =>
  //         e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
  //         e.type === "string.max"
  //     )
  //   ).to.be.true;
  // });

  it("should pass due to valid name", () => {
    const result = updateMemberSchema.validate({
      name: "John Smith",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });

  it("should pass due to null address", () => {
    const result = updateMemberSchema.validate(
      {
        address: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address
      )
    ).to.be.false;
  });

  it("should pass due to empty address", () => {
    const result = updateMemberSchema.validate({
      address: "",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address
      )
    ).to.be.false;
  });

  it("should not pass due address being more than maximum characters", () => {
    const result = updateMemberSchema.validate(
      {
        address: STRING_MORE_THAN_255_CHARACTERS,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid address", () => {
    const result = updateMemberSchema.validate({
      address: "Some street goes here",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address
      )
    ).to.be.false;
  });

  it("should pass due to null number", () => {
    const result = updateMemberSchema.validate({
      number: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to empty number", () => {
    const result = updateMemberSchema.validate({
      number: "",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should not pass due to 8 length number", () => {
    const result = updateMemberSchema.validate(
      {
        number: "93647584",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          e.type === "string.length"
      )
    ).to.be.true;
  });

  it("should not pass due to incorrect number indicative", () => {
    const result = updateMemberSchema.validate(
      {
        number: "906475843",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          e.type === "custom"
      )
    ).to.be.true;
  });

  it("should not pass due number being more than maximum characters", () => {
    const result = updateMemberSchema.validate(
      {
        number: STRING_MORE_THAN_255_CHARACTERS,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
          e.type === "string.length"
      )
    ).to.be.true;
  });

  // it("should not pass due to number being landline number", () => {
  //   const result = updateMemberSchema.validate(
  //     {
  //       number: "253849954",
  //     },
  //     {
  //       abortEarly: false,
  //     }
  //   );

  //   console.log(result.error?.details);

  //   expect(
  //     result.error?.details.some(
  //       (e) =>
  //         e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number &&
  //         e.type === "string.pattern"
  //     )
  //   ).to.be.true;
  // });

  it("should pass due to valid number - 91", () => {
    const result = updateMemberSchema.validate({
      address: "915465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 92", () => {
    const result = updateMemberSchema.validate({
      address: "925465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 93", () => {
    const result = updateMemberSchema.validate({
      address: "935465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 96", () => {
    const result = updateMemberSchema.validate({
      address: "965465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to null landline_number", () => {
    const result = updateMemberSchema.validate({
      landline_number: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number
      )
    ).to.be.false;
  });

  it("should pass due to empty landline_number", () => {
    const result = updateMemberSchema.validate({
      landline_number: "",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number
      )
    ).to.be.false;
  });

  it("should not pass due to 8 length landline_number", () => {
    const result = updateMemberSchema.validate(
      {
        landline_number: "25364734",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "string.length"
      )
    ).to.be.true;
  });

  it("should not pass due landline_number being more than maximum characters", () => {
    const result = updateMemberSchema.validate(
      {
        landline_number: "2536475843",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "string.length"
      )
    ).to.be.true;
  });

  it("should not pass due to landline_number being number", () => {
    const result = updateMemberSchema.validate(
      {
        landline_number: "936475849",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number &&
          e.type === "custom"
      )
    ).to.be.true;
  });

  validLandlinePhoneIndicatives.forEach((indicative) => {
    it(`should pass due to valid phone - ${indicative}`, () => {
      const result = updateMemberSchema.validate(
        {
          landline_number: indicative + "748594",
        },
        {
          abortEarly: false,
        }
      );

      expect(
        result.error?.details.some(
          (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number
        )
      ).to.be.false;
    });
  });

  ["email@-example.com", "plainaddress", "@example.com"].forEach(
    (invalidEmail) => {
      it(`should not pass due to not being a invalid email - ${invalidEmail}`, () => {
        const result = updateMemberSchema.validate(
          {
            email: invalidEmail,
          },
          {
            abortEarly: false,
          }
        );

        expect(
          result.error?.details.some(
            (e) =>
              e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email &&
              e.type === "string.email"
          )
        ).to.be.true;
      });
    }
  );

  it("should not pass due to email being more than maximum length", () => {
    const result = updateMemberSchema.validate(
      {
        email: STRING_MORE_THAN_255_CHARACTERS,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to null email", () => {
    const result = updateMemberSchema.validate(
      {
        email: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email
      )
    ).to.be.false;
  });

  it("should pass due to empty email", () => {
    const result = updateMemberSchema.validate(
      {
        email: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email
      )
    ).to.be.false;
  });

  it("should pass due to white space email", () => {
    const result = updateMemberSchema.validate(
      {
        email: "              ",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email
      )
    ).to.be.false;
  });
});

describe("Member validation tests - DELETE", () => {
  it("should not pass due null object", () => {
    const result = deleteMemberSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = deleteMemberSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to null id", () => {
    const result = deleteMemberSchema.validate({
      id: null,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to undefined id", () => {
    const result = deleteMemberSchema.validate({
      id: undefined,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "any.required"
      )
    ).to.be.true;
  });

  it("should not pass due to negative id", () => {
    const result = deleteMemberSchema.validate({
      id: -1,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero id", () => {
    const result = deleteMemberSchema.validate({
      id: 0,
    });

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to positive id", () => {
    const result = deleteMemberSchema.validate({
      id: 1,
    });

    expect(
      result.error?.details?.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id
      ) ?? false
    ).to.be.false;
  });
});
