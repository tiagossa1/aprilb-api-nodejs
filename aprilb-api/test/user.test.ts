import { loginSchema, registerSchema } from "../src/validations/schemas/user";
import { expect } from "chai";
import { describe } from "mocha";

const OBJECT_PROPERTY_NAME_KEYS = {
  email: "email",
  password: "password",
  name: "name",
  roleCode: "roleCode",
};

const STRING_MORE_THAN_255_CHARACTERS =
  "9hSxjlAMRUicSwJtANEbKuVuSX6tSMi7sEbw7R7EscXrYRdJr5ZAVoogRktla7TL5ENznBtcMHVdDwY7TgIXnfDaWhNxqqaVamF58oVS65O77kymnm0zbcnSHbXivQJ5yKUQTp9NVDqUzfOEw5fpLm3OgrdtVnndOwCCsOyqRngEhrXOFKtERH8Qq78eNNZZdaJAVPk0CCuU7iKh2KOciiZYEcPZFWila5PZW6x79kEaN7S9aVfCvDmb1sxKHGD2";

describe("User validation tests - LOGIN", () => {
  it("should not pass due to null object", () => {
    const result = loginSchema.validate(null, { abortEarly: false });
    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = loginSchema.validate({}, { abortEarly: false });
    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to null email", () => {
    const result = loginSchema.validate(
      {
        email: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty email", () => {
    const result = loginSchema.validate(
      {
        email: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  ["email@-example.com", "plainaddress", "@example.com"].forEach(
    (invalidEmail) => {
      it(`should not pass due to invalid email - ${invalidEmail}`, () => {
        const result = loginSchema.validate(
          {
            email: invalidEmail,
          },
          { abortEarly: false }
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
    const result = loginSchema.validate(
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

  it("should not pass due to white space email", () => {
    const result = loginSchema.validate(
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
    ).to.be.true;
  });

  it("should pass due to valid email", () => {
    const result = loginSchema.validate(
      {
        email: "abc@email.com",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email
      )
    ).to.be.false;
  });

  it("should not pass due to null password", () => {
    const result = loginSchema.validate(
      {
        password: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty password", () => {
    const result = loginSchema.validate(
      {
        password: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due to white space password", () => {
    const result = loginSchema.validate(
      {
        password: "              ",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password
      )
    ).to.be.true;
  });

  it("should not pass due to passowrd being more than maximum length", () => {
    const result = loginSchema.validate(
      {
        password: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid password", () => {
    const result = loginSchema.validate(
      {
        password: "qwerty_not_a_good_password",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password
      )
    ).to.be.false;
  });
});

describe("User validation tests - REGISTER", () => {
  it("should not pass due to null object", () => {
    const result = registerSchema.validate(null, { abortEarly: false });
    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = registerSchema.validate({}, { abortEarly: false });
    expect(result.error?.details).to.not.be.null;
  });

  it("should not pass due to null email", () => {
    const result = registerSchema.validate(
      {
        email: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty email", () => {
    const result = registerSchema.validate(
      {
        email: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  ["email@-example.com", "plainaddress", "@example.com"].forEach(
    (invalidEmail) => {
      it(`should not pass due to invalid email - ${invalidEmail}`, () => {
        const result = registerSchema.validate(
          {
            email: invalidEmail,
          },
          { abortEarly: false }
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
    const result = registerSchema.validate(
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

  it("should not pass due to white space email", () => {
    const result = registerSchema.validate(
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
    ).to.be.true;
  });

  it("should pass due to valid email", () => {
    const result = registerSchema.validate(
      {
        email: "abc@email.com",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.email
      )
    ).to.be.false;
  });

  it("should not pass due to null password", () => {
    const result = registerSchema.validate(
      {
        password: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty password", () => {
    const result = registerSchema.validate(
      {
        password: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due to white space password", () => {
    const result = registerSchema.validate(
      {
        password: "              ",
      },
      {
        abortEarly: false,
      }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password
      )
    ).to.be.true;
  });

  it("should not pass due to passowrd being more than maximum length", () => {
    const result = registerSchema.validate(
      {
        password: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid password", () => {
    const result = registerSchema.validate(
      {
        password: "qwerty_not_a_good_password",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.password
      )
    ).to.be.false;
  });

  it("should not pass due null name", () => {
    const result = registerSchema.validate(
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

  it("should not pass due empty name", () => {
    const result = registerSchema.validate(
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

  it("should not pass due white space name", () => {
    const result = registerSchema.validate(
      {
        name: "                           ",
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

  it("should not pass due name more than maximum characters", () => {
    const result = registerSchema.validate(
      {
        name: STRING_MORE_THAN_255_CHARACTERS,
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

  it("should pass due to valid name", () => {
    const result = registerSchema.validate(
      {
        name: "John Smith",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.name
      )
    ).to.be.false;
  });


  it("should not pass due null role code", () => {
    const result = registerSchema.validate(
      {
        roleCode: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.roleCode &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due empty role code", () => {
    const result = registerSchema.validate(
      {
        roleCode: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.roleCode &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due white space role code", () => {
    const result = registerSchema.validate(
      {
        roleCode: "                           ",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.roleCode &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due role code more than maximum characters", () => {
    const result = registerSchema.validate(
      {
        roleCode: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.roleCode &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to valid role code", () => {
    const result = registerSchema.validate(
      {
        roleCode: "CODE",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) => e.context?.key === OBJECT_PROPERTY_NAME_KEYS.roleCode
      )
    ).to.be.false;
  });
});
