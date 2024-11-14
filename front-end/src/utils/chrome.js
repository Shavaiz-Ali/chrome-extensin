/* eslint-disable no-undef */
export const storage = {
  get: (key) => {
    return new Promise((resolve) => {
      chrome?.storage?.sync?.get(key, (data) => {
        resolve(data || {});
      });
    });
  },

  set: (data) => {
    return new Promise((resolve) => {
      chrome?.storage?.sync?.set(data, () => {
        resolve();
      });
    });
  },
};
