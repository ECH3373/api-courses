import { helpers } from '../../helpers/index.js';

const index = helpers.query.index({
  search: ['name'],
  filters: ['name'],
});

export const query = {
  index,
};
