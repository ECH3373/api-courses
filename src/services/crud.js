import { constrainedMemory } from 'process';

const index = async ({ model, params = {} }) => {
  const data = await model.find(params.query).limit(params.cursor.limit).skip(params.cursor.skip).sort(params.cursor.sort);
  const total = await model.countDocuments(params.query);
  const page = Math.floor(params.cursor.skip / params.cursor.limit) + 1;
  const meta = { pagination: { page, pages: Math.ceil(total / params.cursor.limit), total } };
  return { data, meta };
};

const show = async ({ model, value, fields = ['_id'] } = {}) => {
  for (const field of fields) {
    try {
      const query = { [field]: value };
      const data = await model.findOne(query);
      if (data) return data;
    } catch (error) {
      continue;
    }
  }

  return null;
};

export const crud = {
  index,
  show,
};
