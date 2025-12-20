import api from './api';

export const gameService = {
  getAll: () =>
    api.get('/journals')
      .then(response => response.data)
      .catch(error => console.error("Error fetching games, " + error)),

  getById: (id) =>
    api.get(`/journals/${id}`)
      .then(response => response.data)
      .catch(error => console.error("Error fetching game with id " + id + ", " + error))
};