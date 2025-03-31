import { model } from './model.js';
import { services } from '../../services/index.js';

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model, params: req.querymen });
  return services.response.send({ res, data, meta, message: 'the list of resources has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model, value: req.params.id });
  if (!data) return services.response.send({ res, data, error: 'the resource with the provided ID does not exist' });
  return services.response.send({ res, data, message: 'resource successfully retrieved' });
};

const store = async (req, res) => {
  await services.resources.reorder({ model, spaces: [req.body.order], filters: { module_id: req.body.module_id } });
  const data = await services.crud.store({ model, payload: req.body });
  return services.response.send({ res, data, message: 'resource successfully created' });
};

const update = async (req, res) => {
  await services.resources.reorder({ model, spaces: [req.body.order], filters: { module_id: req.body.module_id, id: { $ne: req.params.id } } });
  const data = await services.crud.update({ model, id: req.params.id, payload: req.body });
  return services.response.send({ res, data, message: 'resource successfully updated' });
};

export const controller = {
  index,
  show,
  store,
  update,
};
