import api from "./api";

export const userService = {
  getUserInfo: () =>
    api.get("/user")
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching user data, " + error);
        throw error;
      }),

  editDisplayName: (data) =>
    api.patch("/user/edit/name", data)
      .then(response => response.data)
      .catch(error => {
        console.error("Error updating display name, " + error);
        throw error;
      })
};