import { services } from '../shared/services/index.js';

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'module', query: req.query, search: ['name', 'description'], filters: ['course_id'] });
  return services.response.send({ res, data, meta, message: 'the list of modules has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'module', target: req.params.id });
  if (!data) return services.response.send({ res, data, error: 'the module with the provided ID does not exist' });
  services.response.send({ res, data, message: 'module successfully retrieved' });
};

const store = async (req, res) => {
  if (req.body.order <= 0 || !req.body.order) req.body.order = 1;
  await services.resources.reorder({ model: 'module', spaces: [req.body.order], filters: { course_id: req.body.course_id } });
  const data = await services.crud.store({ model: 'module', payload: req.body, keys: ['name', 'description', 'image', 'background', 'order', 'course_id'] });
  return services.response.send({ res, data, message: 'module created successfully' });
};

const update = async (req, res) => {
  if (req.body.order <= 0) req.body.order = 1;
  await services.resources.reorder({ model: 'module', spaces: [req.body.order], filters: { course_id: req.body.course_id, NOT: { id: req.params.id } } });
  const data = await services.crud.update({ model: 'module', id: req.params.id, payload: req.body, keys: ['name', 'description', 'image', 'background', 'order'] });
  return services.response.send({ res, data, message: 'module updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'module', id: req.params.id });
  await services.resources.reorder({ model: 'module', filters: { course_id: req.body.course_id } });
  return services.response.send({ res, data, message: 'course deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
