import { services } from '../shared/services/index.js';

const include = [{ key: 'course_id', name: 'course' }];
const expand = [{ key: 'employee_id', name: 'employee', endpoint: 'http://82.29.197.244:3000/employees' }];

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'enrollment', query: req.query, include, expand, filters: ['employee_id', 'course_id'] });
  return services.response.send({ res, data, meta, message: 'the list of enrollments has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'enrollment', target: req.params.id, include, expand });
  if (!data) return services.response.send({ res, data, error: 'the enrollment with the provided ID does not exist' });
  services.response.send({ res, data, message: 'enrollment successfully retrieved' });
};

const store = async (req, res) => {
  const exists = services.resources.exists({ model: 'enrollment', filters: { employee_id: req.body.employee_id, course_id: req.body.course_id } });
  if (exists) return services.response.send({ res, code: 409, error: 'enrollment alredy exists' });
  const data = await services.crud.store({ model: 'enrollment', payload: req.body, keys: ['employee_id', 'course_id'] });
  return services.response.send({ res, data, message: 'enrollment created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'enrollment', id: req.params.id, payload: req.body, keys: ['employee_id', 'course_id'] });
  return services.response.send({ res, data, message: 'enrollment updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'enrollment', id: req.params.id });
  return services.response.send({ res, data, message: 'enrollment deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
