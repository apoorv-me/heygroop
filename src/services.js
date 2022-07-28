import axios from 'axios';

const instance = axios.create({
  baseURL: "http://52.203.217.227:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["...Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if ((originalConfig.url !== "/user/signin" || originalConfig.url !== "/register") && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const userId = localStorage.getItem("id");
          const rs = await refresh({refreshToken, userId})
          localStorage.setItem("accessToken", rs.data.accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export const signUp = (data) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`register`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const login = (data) => {
    console.log(data);
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    instance.post(`logout`).then((res) => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

const refresh = (data) => {
  return new Promise((resolve, reject) => {
    instance.put(`refresh`, data).then((res) => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

// Update Profie


