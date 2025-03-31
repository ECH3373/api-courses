import { model } from './model.js';
import { services } from '../../services/index.js';

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model, params: req.querymen });
  return services.response.send({ res, data, meta, message: 'the list of modules has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model, value: req.params.id });
  if (!data) return services.response.send({ res, data, error: 'the module with the provided ID does not exist' });
  return services.response.send({ res, data, message: 'module successfully retrieved' });
};

const store = async (req, res) => {
  await services.resources.reorder({ model, spaces: [req.body.order], filters: { course_id: req.body.course_id } });
  const data = await services.crud.store({ model, payload: req.body });
  return services.response.send({ res, data, message: 'module successfully created' });
};

const update = async (req, res) => {
  await services.resources.reorder({ model, spaces: [req.body.order], filters: { course_id: req.body.course_id, id: { $ne: req.params.id } } });
  const data = await services.crud.update({ model, id: req.params.id, payload: req.body });
  return services.response.send({ res, data, message: 'module successfully updated' });
};

export const controller = {
  index,
  show,
  store,
  update,
};
