import { faker } from '@faker-js/faker';

import { db } from '../src/config/db';
import {
  products,
  categories,
  users,
  type CreateUserDto,
} from './schemas/schema';

const main = async () => {
  const categoriesData: (typeof categories.$inferInsert)[] = [];

  const productsData: (typeof products.$inferInsert)[] = [];

  const usersData: CreateUserDto[] = [];

  for (let i = 0; i < 10; i++) {
    categoriesData.push({
      name: faker.commerce.department().toLowerCase(),
    });
  }

  const resultCategories = await db
    .insert(categories)
    .values(categoriesData)
    .returning({ id: users.id });

  for (let i = 0; i < 50; i++) {
    productsData.push({
      name: `${faker.word.adjective().toLowerCase()} ${faker.word.noun().toLowerCase()}`,
      price: faker.number.int({ min: 10, max: 1000 }),
      description: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(['DIGITAL', 'PHISICAL']),
      stock: faker.number.int({ min: 1, max: 100 }),
      categoryId: faker.helpers.arrayElement(resultCategories).id,
      imageUrl: faker.image.urlLoremFlickr({ width: 900, height: 900 }),
    });
  }

  for (let i = 0; i < 15; i++) {
    usersData.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
    });
  }

  await db.insert(products).values(productsData);

  await db.insert(users).values(usersData);

  await db.$client.end();
};

main();
