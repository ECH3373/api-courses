import { helpers } from '../../helpers/index.js';

const index = helpers.query.index({
  search: ['name'],
  filters: ['name', 'course_id'],
  sort: ['name', 'course_id', 'order'],
});

export const query = {
  index,
};
