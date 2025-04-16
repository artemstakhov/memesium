import axios from 'axios';

// Определяем базовый URL
const baseURL = process.env.NODE_ENV === 'production' 
  ? '/api/v1' 
  : 'http://localhost:3001/api/v1'; // Используйте порт, на котором запущен сервер

// Создаем экземпляр axios с настройками
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;