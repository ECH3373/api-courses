import { helpers } from '../../helpers/index.js';

const index = helpers.query.index({
  search: ['name', 'duration_seconds'],
  filters: ['name', 'duration_seconds', 'course_id'],
  sort: ['name', 'duration_seconds', 'course_id', 'order'],
});

export const query = {
  index,
};
