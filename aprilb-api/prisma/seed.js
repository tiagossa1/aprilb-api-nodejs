import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import bcrypt from "bcryptjs";
import generator from "generate-password";

const prisma = new PrismaClient();

const seedTripType = async () => {
  await prisma.tripType.upsert({
    where: { code: "ASSOCIATION" },
    update: {},
    create: {
      code: "ASSOCIATION",
      name: "Associação",
    },
  });

  await prisma.tripType.upsert({
    where: { code: "CITY_COUNCIL" },
    update: {},
    create: {
      code: "CITY_COUNCIL",
      name: "Câmara Municipal",
    },
  });
};

const seedRoles = async () => {
  await prisma.role.upsert({
    where: { code: "MANAGER" },
    update: {},
    create: {
      code: "MANAGER",
      name: "Gestor",
      description: "Gestor de passeios",
    },
  });

  await prisma.role.upsert({
    where: { code: "ADMINISTRATOR" },
    update: {},
    create: {
      code: "ADMINISTRATOR",
      name: "Administrador",
      description: "Administrador do sistema.",
    },
  });

  await prisma.role.upsert({
    where: { code: "DESIGNER" },
    update: {},
    create: {
      code: "DESIGNER",
      name: "Designer",
      description: "Designer dos cartazes dos passeios",
    },
  });
};

const seedFakeData = async () => {
  const contacts = Array.from({ length: 100 }).map((val, i) => ({
    id: i + 1,
    address: faker.address.street(),
    email: faker.internet.email(),
    landline_number: faker.phone.number("253######"),
    number: faker.phone.number("91#######"),
  }));

  const members = Array.from({ length: 50 }).map((val, i) => ({
    id: i + 1,
    name: faker.name.fullName(),
    contactId: i + 1,
  }));

  const nonMembers = [];

  for (let index = 51; index <= 100; index++) {
    nonMembers.push({
      contactId: index,
      name: faker.name.fullName(),
    });
  }

  const currentYear = new Date().getUTCFullYear();
  const fromDate = new Date(`${currentYear}-01-01T00:00:00.000Z`);
  const toDate = new Date(`${currentYear}-12-31T00:00:00.000Z`);

  const trips = Array.from({ length: 100 }).map(() => ({
    name: faker.lorem.sentence(10),
    tripTypeCode: faker.helpers.arrayElement(["CITY_COUNCIL", "ASSOCIATION"]),
    destination: faker.lorem.sentence(10),
    description: faker.lorem.sentence(10),
    totalSeats: faker.datatype.number({ min: 50, max: 120 }),
    date: faker.date.between(fromDate, toDate),
  }));

  const memberTrips = Array.from({ length: 100 }).map((val, i) => ({
    memberId: faker.datatype.number({ min: 1, max: 50 }),
    tripId: i + 1,
    reservedSeats: faker.datatype.number({ min: 1, max: 5 }),
    paidAmount: faker.datatype.number({ min: 10, max: 90 }),
  }));

  const nonMemberTrips = Array.from({ length: 100 }).map((val, i) => ({
    nonMemberId: faker.datatype.number({ min: 1, max: 50 }),
    tripId: i + 1,
    reservedSeats: faker.datatype.number({ min: 1, max: 5 }),
    paidAmount: faker.datatype.number({ min: 10, max: 90 }),
  }));

  const fees = Array.from({ length: 100 }).map(() => ({
    year: faker.datatype.number({ min: 2014, max: 2022 }),
    paidAmount: 6,
    memberId: faker.datatype.number({ min: 1, max: 50 }),
  }));

  const contactsToInsert = _(contacts)
    .map((contact) => ({
      address: contact.address,
      email: contact.email,
      landline_number: contact.landline_number,
      number: contact.number,
    }))
    .value();

  await prisma.contact.createMany({
    data: contactsToInsert,
  });

  await prisma.member.createMany({
    data: members,
  });

  await prisma.nonMember.createMany({
    data: nonMembers.map((member) => ({
      contactId: member.contactId,
      name: member.name,
    })),
  });

  await prisma.trip.createMany({
    data: trips,
  });

  await prisma.memberTrip.createMany({
    data: memberTrips,
  });

  await prisma.nonMemberTrip.createMany({
    data: nonMemberTrips,
  });

  await prisma.fee.createMany({
    data: fees,
  });
};

async function main() {
  await seedTripType();
  await seedRoles();

  if (process.env.NODE_ENV === "development") {
    await seedFakeData();

    const userEmail = "administrator@mail.com";

    let userPassword = generator.generate({
      length: 20,
      numbers: true,
      symbols: true,
      excludeSimilarCharacters: true,
    });

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(userPassword, salt);

    await prisma.user.create({
      data: {
        email: userEmail,
        name: "Tiago Sa",
        roleCode: "ADMINISTRATOR",
        password: encryptedPassword,
      },
    });

    console.log(`Password for ${userEmail}: ${userPassword}.`);
  }
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-undef
    console.error(e);
    // eslint-disable-next-line no-undef
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
