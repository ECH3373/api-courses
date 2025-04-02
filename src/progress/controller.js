import { services } from '../shared/services/index.js';

const include = [{ key: 'lesson_id', name: 'lesson' }];
const expand = [{ key: 'employee_id', name: 'employee', endpoint: 'http://82.29.197.244:3000/employees' }];

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'progress', query: req.query, include, expand, filters: ['employee_id', 'lesson_id'] });
  return services.response.send({ res, data, meta, message: 'the list of progresss has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'progress', target: req.params.id, include, expand });
  if (!data) return services.response.send({ res, data, error: 'the progress with the provided ID does not exist' });
  services.response.send({ res, data, message: 'progress successfully retrieved' });
};

const store = async (req, res) => {
  const exists = services.resources.exists({ model: 'progress', filters: { employee_id: req.body.employee_id, lesson_id: req.body.lesson_id } });
  if (exists) return services.response.send({ res, code: 409, error: 'progress alredy exists' });
  const data = await services.crud.store({ model: 'progress', payload: req.body, keys: ['employee_id', 'lesson_id'] });
  return services.response.send({ res, data, message: 'progress created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'progress', id: req.params.id, payload: req.body });
  return services.response.send({ res, data, message: 'progress updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'progress', id: req.params.id });
  return services.response.send({ res, data, message: 'progress deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
