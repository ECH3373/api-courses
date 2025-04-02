import { services } from '../shared/services/index.js';

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'course', query: req.query, search: ['name', 'description'] });
  return services.response.send({ res, data, meta, message: 'the list of courses has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'course', target: req.params.id });
  if (!data) return services.response.send({ res, data, error: 'the course with the provided ID does not exist' });
  services.response.send({ res, data, message: 'course successfully retrieved' });
};

const store = async (req, res) => {
  const data = await services.crud.store({ model: 'course', payload: req.body, keys: ['name', 'description', 'image'] });
  return services.response.send({ res, data, message: 'course created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'course', id: req.params.id, payload: req.body, keys: ['name', 'description', 'image'] });
  return services.response.send({ res, data, message: 'course updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'course', id: req.params.id });
  return services.response.send({ res, data, message: 'course deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
