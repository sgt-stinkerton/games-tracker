import api from './api';

export const gameService = {
  getAllGames: () =>
    api.get('/games')
      .then(response => response.data)
      .catch(error => console.error("Error fetching games, " + error)),

  getGameById: (id) =>
    api.get(`/games/${id}`)
      .then(response => response.data)
      .catch(error => console.error("Error fetching game with id " + id + ", " + error))
};