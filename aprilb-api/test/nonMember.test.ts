import {
  getNonMembersSchema,
  createNonMemberSchema,
  updateNonMemberSchema,
  deleteNonMemberSchema,
  validIndicatives as validLandlinePhoneIndicatives,
} from "../src/validations/schemas/nonMember";
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

describe("Non member validation tests - GET", () => {
  it("should not pass due null object", () => {
    const result = getNonMembersSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = getNonMembersSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should pass due to null filters object", () => {
    const result = getNonMembersSchema.validate({
      filters: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.filters
      ) ?? false
    ).to.be.false;
  });

  it("should pass due to empty filters object", () => {
    const result = getNonMembersSchema.validate({
      filters: {},
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.filters
      ) ?? false
    ).to.be.false;
  });

  it("should pass due to null text", () => {
    const result = getNonMembersSchema.validate({
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
    const result = getNonMembersSchema.validate({
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
    const result = getNonMembersSchema.validate({
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
    const result = getNonMembersSchema.validate({
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

describe("Non member validation tests - CREATE", () => {
  it("should not pass due null object", () => {
    const result = createNonMemberSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = createNonMemberSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to null name", () => {
    const result = createNonMemberSchema.validate(
      {
        name: null,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty name", () => {
    const result = createNonMemberSchema.validate(
      {
        name: "",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due name being more than maximum characters", () => {
    const result = createNonMemberSchema.validate(
      {
        name: STRING_MORE_THAN_255_CHARACTERS,
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid name", () => {
    const result = createNonMemberSchema.validate({
      name: "John Smith",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });

  it("should not pass due to null address", () => {
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate({
      address: "Some street goes here",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address
      )
    ).to.be.false;
  });

  it("should not pass due to null number", () => {
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate({
      address: "915465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 92", () => {
    const result = createNonMemberSchema.validate({
      address: "925465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 93", () => {
    const result = createNonMemberSchema.validate({
      address: "935465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 96", () => {
    const result = createNonMemberSchema.validate({
      address: "965465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should not pass due to null landline_number", () => {
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
      const result = createNonMemberSchema.validate(
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
        const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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
    const result = createNonMemberSchema.validate(
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

describe("Non member validation tests - UPDATE", () => {
  it("should not pass due null object", () => {
    const result = updateNonMemberSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = updateNonMemberSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to null id", () => {
    const result = updateNonMemberSchema.validate({
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
    const result = updateNonMemberSchema.validate({
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
    const result = updateNonMemberSchema.validate({
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
    const result = updateNonMemberSchema.validate({
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
    const result = updateNonMemberSchema.validate({
      id: 1,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id
      ) ?? false
    ).to.be.false;
  });

  it("should pass due to null name", () => {
    const result = updateNonMemberSchema.validate({
      name: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });

  it("should pass due to empty name", () => {
    const result = updateNonMemberSchema.validate({
      name: "",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });

  // it("should not pass due name being more than maximum characters", () => {
  //   const result = updateNonMemberSchema.validate({
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
    const result = updateNonMemberSchema.validate({
      name: "John Smith",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });

  it("should pass due to null address", () => {
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate({
      address: "",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address
      )
    ).to.be.false;
  });

  it("should not pass due address being more than maximum characters", () => {
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate({
      address: "Some street goes here",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.address
      )
    ).to.be.false;
  });

  it("should pass due to null number", () => {
    const result = updateNonMemberSchema.validate({
      number: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to empty number", () => {
    const result = updateNonMemberSchema.validate({
      number: "",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should not pass due to 8 length number", () => {
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate(
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
  //   const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate({
      address: "915465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 92", () => {
    const result = updateNonMemberSchema.validate({
      address: "925465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 93", () => {
    const result = updateNonMemberSchema.validate({
      address: "935465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to valid number - 96", () => {
    const result = updateNonMemberSchema.validate({
      address: "965465743",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.number
      )
    ).to.be.false;
  });

  it("should pass due to null landline_number", () => {
    const result = updateNonMemberSchema.validate({
      landline_number: null,
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number
      )
    ).to.be.false;
  });

  it("should pass due to empty landline_number", () => {
    const result = updateNonMemberSchema.validate({
      landline_number: "",
    });

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.landline_number
      )
    ).to.be.false;
  });

  it("should not pass due to 8 length landline_number", () => {
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate(
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
      const result = updateNonMemberSchema.validate(
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
        const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate(
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
    const result = updateNonMemberSchema.validate(
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

describe("Non member validation tests - DELETE", () => {
  it("should not pass due null object", () => {
    const result = deleteNonMemberSchema.validate(null, {
      abortEarly: false,
    });

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = deleteNonMemberSchema.validate(
      {},
      {
        abortEarly: false,
      }
    );

    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to null id", () => {
    const result = deleteNonMemberSchema.validate({
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
    const result = deleteNonMemberSchema.validate({
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
    const result = deleteNonMemberSchema.validate({
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
    const result = deleteNonMemberSchema.validate({
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
    const result = deleteNonMemberSchema.validate({
      id: 1,
    });

    expect(
      result.error?.details?.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id
      ) ?? false
    ).to.be.false;
  });
});
