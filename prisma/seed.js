import prisma from "@/app/lib/client";

async function main() {
    // const password1 = await hashPass('@Bay1234', 12)
    const john = await prisma.user.upsert({
        where: {email: 'johndoe@gmail.com'},
        update: {},
        create: {
            email: 'johndoe@gmail.com',
            password:'@Bay1234',
            tasks: {
                create: {
                    title: 'Task 1',
                    description: 'This is task 1'
                }
            }
        }
    });

    // const password2 = await hashPass('Qwerty1234', 12)
    const jane = await prisma.user.upsert({
        where: {email: 'janedoe@gmail.com'},
        update: {},
        create: {
            email: 'janedoe@gmai.com',
            password: 'Qwerty1234',
            tasks: {
                create: {
                    title: 'Task 2',
                    description: 'This is task 2'
                }
            }
        }
    });
    console.log({ john, jane });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})