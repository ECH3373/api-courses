import { services } from '../shared/services/index.js';

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'lesson', query: req.query, search: ['name', 'duration_seconds'], filters: ['duration_seconds', 'module_id'] });
  return services.response.send({ res, data, meta, message: 'the list of lessons has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'lesson', target: req.params.id });
  if (!data) return services.response.send({ res, data, error: 'the lesson with the provided ID does not exist' });
  services.response.send({ res, data, message: 'lesson successfully retrieved' });
};

const store = async (req, res) => {
  if (req.body.order <= 0 || !req.body.order) req.body.order = 1;
  await services.resources.reorder({ model: 'lesson', spaces: [req.body.order], filters: { module_id: req.body.module_id } });
  const data = await services.crud.store({ model: 'lesson', payload: req.body, keys: ['name', 'image', 'file', 'duration_seconds', 'order', 'module_id'] });
  return services.response.send({ res, data, message: 'lesson created successfully' });
};

const update = async (req, res) => {
  if (req.body.order <= 0) req.body.order = 1;
  await services.resources.reorder({ model: 'lesson', spaces: [req.body.order], filters: { module_id: req.body.module_id, NOT: { id: req.params.id } } });
  const data = await services.crud.update({ model: 'lesson', id: req.params.id, payload: req.body, keys: ['name', 'image', 'file', 'duration_seconds', 'order'] });
  return services.response.send({ res, data, message: 'lesson updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'lesson', id: req.params.id });
  await services.resources.reorder({ model: 'lesson', filters: { course_id: req.body.course_id } });
  return services.response.send({ res, data, message: 'lesson deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
