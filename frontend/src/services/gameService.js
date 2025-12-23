import api from "./api";

export const gameService = {
  getAllEntries: () =>
    api.get("/entries")
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

  getEntryByGameId: (id) =>
    api.get(`/entries/game/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching entry with game id " + id + ", " + error);
        throw error;
      }),

  createEntry: (data) =>
    api.post("/entries", data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating entry, " + error);
        throw error;
      }),

  updateStatus: (id, status) =>
    api.patch(`/entries/${id}/status`, null, {
      params: {
        status: status
      }
    }).then(response => response.data)
      .catch(error => {
        console.error("Error updating status, " + error);
        throw error;
      }),

  createReview: (id, data) =>
    api.put(`/entries/${id}/review`, data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating review, " + error);
        throw error;
      }),

  getAllGames: () =>
    api.get("/games")
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching games, " + error);
        throw error;
      }),

  createGame: (data) =>
    api.post("/games", data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating game, " + error);
        throw error;
      }),

  syncGame: (appId, name) =>
    api.post("/games/sync", null, {
      params: {
        appId: appId,
        name: name
      }
    }),

  getOwnedIds: () =>
    api.get("/steam/ids")
      .then(response => response.data)
      .catch(error => {
        console.error("Error getting owned ids, " + error);
        throw error;
      })
};