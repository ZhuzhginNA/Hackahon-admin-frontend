import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const fetchReservations = async () => {
  try {
    const response = await api.get('api/reservation?status=в рассмотрении');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchReservationsApproved = async () => {
  try {
    const response = await api.get('api/reservation?status=подтверждено');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendReservation = async (id: number, begin: string, end: string, status: string) => {
  try {
    const response = await api.put(`api/reservation/${id}`, {
      begin,
      end,
      status
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchServers = async () => {
  try {
    const response = await api.get('api/server');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchOs = async () => {
  try {
    const response = await api.get('api/os');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postOs = async (id: number, data: number) => {
  try {
    const response = await api.post(`api/server/${id}`, { os_id: data });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postClient = async (name: string, password: string, email: string) => {
  try {
    const response = await api.post('api/auth/register', { name, password, email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const auth = async (login: string, password: string) => {
  try {
    const response = await api.post('api/auth/login', {
      email: login,
      password: password
    });
    console.log(response.data);
    // Сохраняем токен в localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Удаляем токен из localStorage
      localStorage.removeItem('token');
      // Перенаправляем пользователя на страницу логина
      //window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
