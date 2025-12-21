import api from './api';

export const gameService = {
  getAllEntries: () =>
    api.get('/entries')
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching entries, " + error);
        throw error;
      }),

  getEntryById: (id) =>
    api.get(`/entries/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching entry with id " + id + ", " + error);
        throw error;
      }),

  createEntry: (data) =>
    api.post('/entries', data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating entry, " + error);
        throw error;
      }),

  createReview: (id, data) =>
    api.put('/entries/${id}/review', data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating review, " + error);
        throw error;
      }),

  getAllGames: () =>
    api.get('/games')
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching games, " + error);
        throw error;
      }),

  createGame: (data) =>
    api.post('/games', data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating game, " + error);
        throw error;
      })
};