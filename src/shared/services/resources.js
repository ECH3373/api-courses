import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const reorder = async ({ model, spaces = [], filters = {} } = {}) => {
  const resources = await prisma[model].findMany({ where: filters, orderBy: { order: 'asc' } });
  let candidate = 1;

  for (const resource of resources) {
    while (spaces.includes(candidate)) candidate++;
    await prisma[model].update({ where: { id: resource.id }, data: { order: candidate } });
    candidate++;
  }
};

export const resources = {
  reorder,
};
