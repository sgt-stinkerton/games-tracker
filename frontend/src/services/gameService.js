import api from "./api";

export const gameService = {
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