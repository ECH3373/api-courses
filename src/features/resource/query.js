import { helpers } from '../../helpers/index.js';

const index = helpers.query.index({
  search: ['name'],
  filters: ['lesson_id'],
  sort: ['quantity', 'lesson_id'],
});

export const query = {
  index,
};
