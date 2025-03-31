import { helpers } from '../../helpers/index.js';

const index = helpers.query.index({
  filters: ['employee_id', 'course_id'],
  sort: ['employee_id', 'course_id'],
});

export const query = {
  index,
};
