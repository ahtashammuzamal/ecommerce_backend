export const isValidUpdate = (allowedUpdates, updatesObj) => {
  const requestedUpdates = Object.keys(updatesObj);
  return requestedUpdates.every((update) => allowedUpdates.includes(update));
};
