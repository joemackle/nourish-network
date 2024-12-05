const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      {
        name: "Food Drive at Central Park",
        location: "Central Park, NYC",
        zipCode: "10001",
        date: new Date("2024-12-10T10:00:00Z"),
      },
      {
        name: "Community Potluck",
        location: "123 Elm Street, NYC",
        zipCode: "10001",
        date: new Date("2024-12-15T18:00:00Z"),
      },
      {
        name: "Soup Kitchen Volunteer Day",
        location: "456 Oak Avenue, NYC",
        zipCode: "10002",
        date: new Date("2024-12-20T12:00:00Z"),
      },
    ],
  });

  console.log("Seeded events data");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
