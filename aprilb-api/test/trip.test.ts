import {
  getTripSchema,
  createTripSchema,
  updateTripSchema,
  deleteTripSchema,
  lastTripSchema,
} from "../src/validations/schemas/trip";
import { expect } from "chai";
import { describe } from "mocha";

const OBJECT_PROPERTY_NAME_KEYS = {
  take: "take",
  text: "text",
  tripTypeCode: "tripTypeCode",
  date: "date",
  dateStart: "dateStart",
  dateEnd: "dateEnd",
  name: "name",
  tripPosterFileName: "tripPosterFileName",
  destination: "destination",
  description: "description",
  memberId: "memberId",
  reservedSeats: "reservedSeats",
  paidAmount: "paidAmount",
  nonMemberId: "nonMemberId",
  id: "id",
  totalSeats: "totalSeats",
};

const STRING_MORE_THAN_255_CHARACTERS =
  "9hSxjlAMRUicSwJtANEbKuVuSX6tSMi7sEbw7R7EscXrYRdJr5ZAVoogRktla7TL5ENznBtcMHVdDwY7TgIXnfDaWhNxqqaVamF58oVS65O77kymnm0zbcnSHbXivQJ5yKUQTp9NVDqUzfOEw5fpLm3OgrdtVnndOwCCsOyqRngEhrXOFKtERH8Qq78eNNZZdaJAVPk0CCuU7iKh2KOciiZYEcPZFWila5PZW6x79kEaN7S9aVfCvDmb1sxKHGD2";

describe("Trip validation tests - LAST TRIP", () => {
  it("should not pass due to empty object", () => {
    const result = lastTripSchema.validate({}, { abortEarly: false });
    expect(result.error).to.be.not.null;
  });

  it("should not pass due to null take", () => {
    const result = lastTripSchema.validate(
      {
        take: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.take &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should pass due to undefined take", () => {
    const result = lastTripSchema.validate(
      {
        take: undefined,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.take &&
          e.type === "number.base"
      )
    ).to.be.false;
  });

  it("should not pass due to negative take", () => {
    const result = lastTripSchema.validate(
      {
        take: -1,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.take &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to valid object", () => {
    const result = lastTripSchema.validate(
      {
        take: 1,
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });
});

describe("Trip validation tests - GET", () => {
  it("should not pass due to null object", () => {
    const result = getTripSchema.validate({}, { abortEarly: false });

    expect(result.error?.message).to.be.undefined;
  });

  it("should not pass due text bigger than maximum characters", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          text: "ekJjggrU8csTrPO6k8dCZHsetAUfcw0et4eHatIq2HABcoYRZCg7UYgwlcx0pAfZJxKP5fNuMHEr824GDhDIJaUZPOErWC6VAVZSvKHnIYmNLBJTATUEfUgNT8DVhIjWLiI3sVUF4wghMIiHJ4ddMJWxPTp84t61FJjcO3zDJhwF2JWsa96X0OdCE5dVMX3DWerNIRqAADXecYLEGtizqmeGwGpXc5ZCgp4tgCSkusgUZXFgNFjprPtHDHXouPza",
        },
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.text &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to text being empty text", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          text: "",
        },
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });

  it("should not pass due to trip type code bigger than maximum characters", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          tripTypeCode:
            "ekJjggrU8csTrPO6k8dCZHsetAUfcw0et4eHatIq2HABcoYRZCg7UYgwlcx0pAfZJxKP5fNuMHEr824GDhDIJaUZPOErWC6VAVZSvKHnIYmNLBJTATUEfUgNT8DVhIjWLiI3sVUF4wghMIiHJ4ddMJWxPTp84t61FJjcO3zDJhwF2JWsa96X0OdCE5dVMX3DWerNIRqAADXecYLEGtizqmeGwGpXc5ZCgp4tgCSkusgUZXFgNFjprPtHDHXouPza",
        },
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripTypeCode &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to trip type code being empty", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          tripTypeCode: "",
        },
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });

  it("should not pass due to DateStart being less than 2014/01/01", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          dateStart: new Date(2013, 0, 1),
        },
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.dateStart &&
          e.type === "date.greater"
      )
    ).to.be.true;
  });

  it("should pass due to DateStart being empty", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          dateStart: "",
        },
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });

  it("should not pass due to DateEnd being less than 2014/01/01", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          dateEnd: new Date(2013, 0, 1),
        },
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.dateEnd &&
          e.type === "date.greater"
      )
    ).to.be.true;
  });

  it("should not pass due to DateEnd being greater than 2099/01/01", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          dateEnd: new Date(2100, 0, 1),
        },
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.dateEnd &&
          e.type === "date.less"
      )
    ).to.be.true;
  });

  it("should pass due to date end being empty", () => {
    const result = getTripSchema.validate(
      {
        filters: {
          dateEnd: "",
        },
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });

  it("should pass due to null filters object", () => {
    const result = getTripSchema.validate(
      {
        filters: null,
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });

  it("should pass due to undefined filters object", () => {
    const result = getTripSchema.validate(
      {
        filters: undefined,
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });

  it("should pass due to empty filters object", () => {
    const result = getTripSchema.validate(
      {
        filters: {},
      },
      { abortEarly: false }
    );

    expect(result.error?.message).to.be.undefined;
  });
});

describe("Trip validation tests - CREATE", () => {
  it("should not pass due to null object", () => {
    const result = createTripSchema.validate(null, { abortEarly: false });
    expect(result.error).to.be.not.null;
  });

  it("should not pass due to empty object", () => {
    const result = createTripSchema.validate({}, { abortEarly: false });
    expect(result.error).to.be.not.null;
  });

  it("should not pass due to null name", () => {
    const result = createTripSchema.validate(
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

  it("should not pass due to empty name", () => {
    const result = createTripSchema.validate(
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

  it("should not pass due to name being more than 255 characters", () => {
    const result = createTripSchema.validate(
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

  it("should not pass due to null trip type code", () => {
    const result = createTripSchema.validate(
      {
        tripTypeCode: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripTypeCode &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty trip type code", () => {
    const result = createTripSchema.validate(
      {
        tripTypeCode: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripTypeCode &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due to trip type code being more than 255 characters", () => {
    const result = createTripSchema.validate(
      {
        tripTypeCode: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripTypeCode &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should not pass due to trip poster file name being more than 255 characters", () => {
    const result = createTripSchema.validate(
      {
        tripPosterFileName: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripPosterFileName &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to null trip poster file name", () => {
    const result = createTripSchema.validate(
      {
        tripPosterFileName: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripPosterFileName &&
          e.type === "string.empty"
      )
    ).to.be.false;
  });

  it("should not pass due to null destination", () => {
    const result = createTripSchema.validate(
      {
        destination: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.destination &&
          e.type === "string.base"
      )
    ).to.be.true;
  });

  it("should not pass due to empty trip type code", () => {
    const result = createTripSchema.validate(
      {
        destination: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.destination &&
          e.type === "string.empty"
      )
    ).to.be.true;
  });

  it("should not pass due to trip type code being more than 255 characters", () => {
    const result = createTripSchema.validate(
      {
        destination: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.destination &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to null description", () => {
    const result = createTripSchema.validate(
      {
        description: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.destination &&
          (e.type === "any.required" || e.type === "string.base")
      )
    ).to.be.true;
  });

  it("should pass due to empty description", () => {
    const result = createTripSchema.validate(
      {
        description: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.description &&
          e.type === "string.empty"
      )
    ).to.be.false;
  });

  it("should not pass due to description name being more than 255 characters", () => {
    const result = createTripSchema.validate(
      {
        description: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.description &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should not pass due to negative total seats", () => {
    const result = createTripSchema.validate(
      {
        totalSeats: -1,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.totalSeats &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero total seats", () => {
    const result = createTripSchema.validate(
      {
        totalSeats: 0,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.totalSeats &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to positive total seats", () => {
    const result = createTripSchema.validate(
      {
        totalSeats: 1,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.totalSeats &&
          e.type === "number.positive"
      )
    ).to.be.false;
  });

  it("should not pass due to null date", () => {
    const result = createTripSchema.validate(
      {
        date: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.date &&
          e.type === "date.base"
      )
    ).to.be.true;
  });

  it("should not pass due to date being less than 2014/01/01", () => {
    const result = createTripSchema.validate(
      {
        date: new Date(2013, 0, 1),
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.date &&
          e.type === "date.min"
      )
    ).to.be.true;
  });

  it("should not pass due to date being greater than 2099/01/01", () => {
    const result = createTripSchema.validate(
      {
        date: new Date(2100, 0, 1),
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.date &&
          e.type === "date.max"
      )
    ).to.be.true;
  });

  it("should pass due to date being between range", () => {
    const result = createTripSchema.validate(
      {
        date: new Date(2014, 1, 1),
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.date &&
          (e.type === "date.min" || e.type === "date.max")
      )
    ).to.be.false;
  });

  describe("Member Trip", () => {
    it("should not pass due to member id being null", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              memberId: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to member id being zero", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              memberId: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to member id being negative", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              memberId: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being null", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              reservedSeats: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being zero", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              reservedSeats: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being negative", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              reservedSeats: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being null", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              paidAmount: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being zero", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              paidAmount: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being negative", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              paidAmount: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should pass due to member id being positive", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              memberId: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });

    it("should pass due to reserved seats being positive", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              reservedSeats: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });

    it("should pass due to paid amount being positive", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              paidAmount: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });
  });

  describe("Non Member Trip", () => {
    it("should not pass due to non member id being null", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              nonMemberId: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.nonMemberId &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to non member id being zero", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              nonMemberId: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.nonMemberId &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to non member id being negative", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              nonMemberId: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.nonMemberId &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being null", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              reservedSeats: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being zero", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              reservedSeats: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being negative", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              reservedSeats: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being null", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              paidAmount: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being zero", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              paidAmount: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being negative", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              paidAmount: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should pass due to non member id being positive", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              nonMemberId: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });

    it("should pass due to reserved seats being positive", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              reservedSeats: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });

    it("should pass due to paid amount being positive", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              paidAmount: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });
  });
});

describe("Trip validation tests - UPDATE", () => {
  it("should not pass due to null object", () => {
    const result = updateTripSchema.validate(null, { abortEarly: false });
    expect(result.error).to.be.not.null;
  });

  it("should not pass due to empty object", () => {
    const result = updateTripSchema.validate({}, { abortEarly: false });
    expect(result.error).to.be.not.null;
  });

  it("should pass due to null name", () => {
    const result = updateTripSchema.validate(
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
    ).to.be.false;
  });

  it("should pass due to empty name", () => {
    const result = updateTripSchema.validate(
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
    ).to.be.false;
  });

  it("should not pass due to name being more than 255 characters", () => {
    const result = updateTripSchema.validate(
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

  it("should pass due to null trip type code", () => {
    const result = updateTripSchema.validate(
      {
        tripTypeCode: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripTypeCode &&
          e.type === "string.base"
      )
    ).to.be.false;
  });

  it("should not pass due to empty trip type code", () => {
    const result = updateTripSchema.validate(
      {
        tripTypeCode: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripTypeCode &&
          e.type === "string.empty"
      )
    ).to.be.false;
  });

  it("should not pass due to trip type code being more than 255 characters", () => {
    const result = updateTripSchema.validate(
      {
        tripTypeCode: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripTypeCode &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should not pass due to trip poster file name being more than 255 characters", () => {
    const result = updateTripSchema.validate(
      {
        tripPosterFileName: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripPosterFileName &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to null trip poster file name", () => {
    const result = updateTripSchema.validate(
      {
        tripPosterFileName: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.tripPosterFileName &&
          e.type === "string.empty"
      )
    ).to.be.false;
  });

  it("should pass due to null destination", () => {
    const result = updateTripSchema.validate(
      {
        destination: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.destination &&
          e.type === "string.base"
      )
    ).to.be.false;
  });

  it("should pass due to empty trip type code", () => {
    const result = updateTripSchema.validate(
      {
        destination: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.destination &&
          e.type === "string.empty"
      )
    ).to.be.false;
  });

  it("should not pass due to trip type code being more than 255 characters", () => {
    const result = updateTripSchema.validate(
      {
        destination: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.destination &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should pass due to null description", () => {
    const result = updateTripSchema.validate(
      {
        description: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.destination &&
          (e.type === "any.required" || e.type === "string.base")
      )
    ).to.be.false;
  });

  it("should pass due to empty description", () => {
    const result = updateTripSchema.validate(
      {
        description: "",
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.description &&
          e.type === "string.empty"
      )
    ).to.be.false;
  });

  it("should not pass due to description name being more than 255 characters", () => {
    const result = updateTripSchema.validate(
      {
        description: STRING_MORE_THAN_255_CHARACTERS,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.description &&
          e.type === "string.max"
      )
    ).to.be.true;
  });

  it("should not pass due to negative total seats", () => {
    const result = updateTripSchema.validate(
      {
        totalSeats: -1,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.totalSeats &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should not pass due to zero total seats", () => {
    const result = updateTripSchema.validate(
      {
        totalSeats: 0,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.totalSeats &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });

  it("should pass due to positive total seats", () => {
    const result = updateTripSchema.validate(
      {
        totalSeats: 1,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.totalSeats &&
          e.type === "number.positive"
      )
    ).to.be.false;
  });

  it("should pass due to null date", () => {
    const result = updateTripSchema.validate(
      {
        date: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.date &&
          e.type === "date.base"
      )
    ).to.be.false;
  });

  it("should not pass due to date being less than 2014/01/01", () => {
    const result = updateTripSchema.validate(
      {
        date: new Date(2013, 0, 1),
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.date &&
          e.type === "date.min"
      )
    ).to.be.true;
  });

  it("should not pass due to date being greater than 2099/01/01", () => {
    const result = updateTripSchema.validate(
      {
        date: new Date(2100, 0, 1),
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.date &&
          e.type === "date.max"
      )
    ).to.be.true;
  });

  it("should pass due to date being between range", () => {
    const result = updateTripSchema.validate(
      {
        date: new Date(2014, 1, 1),
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.date &&
          (e.type === "date.min" || e.type === "date.max")
      )
    ).to.be.false;
  });

  describe("Member Trip", () => {
    it("should not pass due to member id being null", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              memberId: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to member id being zero", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              memberId: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to member id being negative", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              memberId: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being null", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              reservedSeats: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being zero", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              reservedSeats: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being negative", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              reservedSeats: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being null", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              paidAmount: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being zero", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              paidAmount: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being negative", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              paidAmount: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should pass due to member id being positive", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              memberId: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });

    it("should pass due to reserved seats being positive", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              reservedSeats: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });

    it("should pass due to paid amount being positive", () => {
      const result = createTripSchema.validate(
        {
          memberTrip: [
            {
              paidAmount: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });
  });

  describe("Non Member Trip", () => {
    it("should not pass due to non member id being null", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              nonMemberId: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.nonMemberId &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to non member id being zero", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              nonMemberId: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.nonMemberId &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to non member id being negative", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              nonMemberId: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.nonMemberId &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being null", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              reservedSeats: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being zero", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              reservedSeats: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to reserved seats being negative", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              reservedSeats: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being null", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              paidAmount: null,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.base"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being zero", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              paidAmount: 0,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should not pass due to paid amount being negative", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              paidAmount: -1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.true;
    });

    it("should pass due to non member id being positive", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              nonMemberId: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.memberId &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });

    it("should pass due to reserved seats being positive", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              reservedSeats: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.reservedSeats &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });

    it("should pass due to paid amount being positive", () => {
      const result = createTripSchema.validate(
        {
          nonMemberTrip: [
            {
              paidAmount: 1,
            },
          ],
        },
        { abortEarly: false }
      );

      expect(
        result.error?.details.some(
          (e) =>
            e.context?.key === OBJECT_PROPERTY_NAME_KEYS.paidAmount &&
            e.type === "number.positive"
        )
      ).to.be.false;
    });
  });
});

describe("Trip validation tests - DELETE", () => {
  it("should not pass due to null object", () => {
    const result = deleteTripSchema.validate(null, { abortEarly: false });

    expect(result.error).to.not.be.null;
  });

  it("should not pass due to empty object", () => {
    const result = deleteTripSchema.validate({}, { abortEarly: false });

    expect(result.error).to.not.be.null;
  });

  it("should not pass due to null id", () => {
    const result = deleteTripSchema.validate(
      {
        id: null,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.base"
      )
    ).to.be.true;
  });

  it("should not pass due to undefined id", () => {
    const result = deleteTripSchema.validate(
      {
        id: undefined,
      },
      { abortEarly: false }
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
    const result = deleteTripSchema.validate(
      {
        id: -1,
      },
      { abortEarly: false }
    );

    expect(
      result.error?.details.some(
        (e) =>
          e.context?.key === OBJECT_PROPERTY_NAME_KEYS.id &&
          e.type === "number.positive"
      )
    ).to.be.true;
  });
});
