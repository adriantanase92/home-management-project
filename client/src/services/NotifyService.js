export default {
  alert: function(message, type, timeout = null) {
    clearTimeout(this.timeout);
    window.notifyAlertObj.show = false;
    window.notifyAlertObj.message = message;
    window.notifyAlertObj.type = type;
    setTimeout(() => {
      window.notifyAlertObj.show = true;
    }, 0);
    if (timeout) {
      this.timeout = setTimeout(() => {
        window.notifyAlertObj.show = false;
      }, timeout);
    }
  }
};
