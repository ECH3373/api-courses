import { model } from './model.js';
import { services } from '../../services/index.js';

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model, params: req.querymen });
  return services.response.send({ res, data, meta, message: 'the list of courses has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model, value: req.params.id });
  if (!data) return services.response.send({ res, data, error: 'the course with the provided ID does not exist' });
  return services.response.send({ res, data, message: 'course successfully retrieved' });
};

const store = async (req, res) => {
  const data = await services.crud.store({ model, payload: req.body });
  return services.response.send({ res, data, message: 'course successfully created' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model, id: req.params.id, payload: req.body });
  return services.response.send({ res, data, message: 'course successfully updated' });
};

export const controller = {
  index,
  show,
  store,
  update,
};
