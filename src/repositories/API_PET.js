import instance from "../services/PetService";

export const login = async (params) => {
  const { data } = await instance.post("login", params);
  window.localStorage.setItem("pet-user", JSON.stringify(data.data));
  return data;
};

export const register = async (params) => {
  const { data } = await instance.postForm("register", params);
  return data;
};

export const storePet = async (params) => {
  const { data } = await instance.post("pets", params);
  return data;
};

export const updatePet = async (params) => {
  const { data } = await instance.put(`pets/${params.id}`, params);
  return data;
};

export const getPet = async (id) => {
  const { data } = await instance.get(`pets/${id}`);
  return data;
};

export const getUserPets = async (params) => {
  const { data } = await instance.get(`user/${params.id}/pets`);
  return data;
};

export const updateProfile = async (params) => {
  const { data } = await instance.postForm(`user/${params.id}`, {
    ...params,
    method: 'PUT',
  });
  return data;
};

export const getUser = async (id) => {
  const { data } = await instance.get(`user/${id}`);
  return data;
};
