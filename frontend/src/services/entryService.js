import api from "./api";

export const entryService = {
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

  updateNotes: (id, data) =>
    api.patch(`/entries/${id}/notes`, data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error updating notes, " + error);
        throw error;
      }),

  createReview: (id, data) =>
    api.put(`/entries/${id}/review`, data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error creating review, " + error);
        throw error;
      })
};