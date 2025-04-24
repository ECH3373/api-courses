import { services } from '../shared/services/index.js';

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'resource', query: req.query, search: ['name', 'description'], filters: ['quantity', 'lesson_id'] });
  return services.response.send({ res, data, meta, message: 'the list of resources has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'resource', target: req.params.id });
  if (!data) return services.response.send({ res, data, error: 'the resource with the provided ID does not exist' });
  services.response.send({ res, data, message: 'resource successfully retrieved' });
};

const store = async (req, res) => {
  const data = await services.crud.store({ model: 'resource', payload: req.body, keys: ['name', 'description', 'image', 'background', 'quantity', 'lesson_id'] });
  return services.response.send({ res, data, message: 'resource created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'resource', id: req.params.id, payload: req.body, keys: ['name', 'description', 'image', 'background', 'quantity'] });
  return services.response.send({ res, data, message: 'resource updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'resource', id: req.params.id });
  return services.response.send({ res, data, message: 'resource deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
