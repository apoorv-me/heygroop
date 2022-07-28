export const getUser = (state) => {
  return Object.keys(state.user).length > 0 ? state.user : null;
};

export const getToken = (state) => {
  return Object.keys(state.user).length > 0 ? state.user.token : null;
};