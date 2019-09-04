import HttpService from "./HttpService";
import RestConstants from "./RestConstants";

export default {
  getUsers() {
    const url = RestConstants.USERS;
    return new Promise(function(resolve, reject) {
      HttpService.get(url)
        .then(result => resolve(result))
        .catch(err => {
          return reject(err);
        });
    });
  },
  getExpense() {
    const url = RestConstants.EXPENSES;
    return new Promise(function(resolve, reject) {
      HttpService.get(url)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  getExpenses() {
    const url = RestConstants.EXPENSES;
    return new Promise(function(resolve, reject) {
      HttpService.get(url)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  addExpense(expense) {
    return new Promise(function(resolve, reject) {
      HttpService.post(RestConstants.EXPENSES, expense)
        .then(result => {
          window.epicAlert("item_added_success", "success", 3500);
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  getExpense(id) {
    return new Promise(function(resolve, reject) {
      HttpService.get(`${RestConstants.EXPENSES}${id}`)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateExpense(id, expense) {
    return new Promise(function(resolve, reject) {
      HttpService.put(`${RestConstants.EXPENSES}${id}`, expense)
        .then(result => {
          window.epicAlert("item_edited_success", "success", 3500);
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  deleteExpense(id) {
    return new Promise(function(resolve, reject) {
      HttpService.delete(`${RestConstants.EXPENSES}${id}`)
        .then(result => {
          window.epicAlert("item_deleted_success", "success", 3500);
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};
