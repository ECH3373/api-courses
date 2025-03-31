const reorder = async ({ model, spaces = [], filters = {} } = {}) => {
  const resources = await model.find(filters);

  let candidate = 1;

  for (let i = 0; i < resources.length; i++) {
    while (spaces.includes(candidate)) candidate++;
    await model.findByIdAndUpdate(resources[i]._id, { $set: { order: candidate } });
    candidate++;
  }
};

export const resources = {
  reorder,
};
