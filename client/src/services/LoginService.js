import HttpService from './HttpService';
import RestConstants from './RestConstants';

export default {
    login: function (user) {
        return new Promise(function (resolve, reject) {
            HttpService.post(RestConstants.LOGIN, user)
                .then(result => {
                    if (result.status === 200) {
                        localStorage.setItem('token', result.data.token);
                        return resolve(result);
                      }
                })
                .catch(err => {
                    return reject(err);
                });
        });
    },
};
