import HttpService from './HttpService';
import RestConstants from './RestConstants';

export default {
    getUsers: function () {
        let url = RestConstants.USERS;
        return new Promise(function (resolve, reject) {
            HttpService.get(url)
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    },
    addUser: function (user) {
        return new Promise(function (resolve, reject) {
            HttpService.post(RestConstants.USERS, user)
                .then(result => {
                    window.epicAlert('item_added_success', 'success', 3500);
                    return resolve(result);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    },
    getUser: function (id) {
        return new Promise(function (resolve, reject) {
            HttpService.get(`${RestConstants.USERS}${id}`)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    updateUser: function (id, user) {
        return new Promise(function (resolve, reject) {
            HttpService.put(`${RestConstants.USERS}${id}`, user)
                .then(result => {
                    window.epicAlert('item_edited_success', 'success', 3500);
                    return resolve(result);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    },
    deleteUser: function (id) {
        return new Promise(function (resolve, reject) {
            HttpService.delete(`${RestConstants.USERS}${id}`)
                .then(result => {
                    window.epicAlert(
                        'item_deleted_success',
                        'success',
                        3500
                    );
                    return resolve(result);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }
};
