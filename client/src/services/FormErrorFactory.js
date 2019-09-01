export default {
  userErrorData: {
    custom: {
      fname: {
        required: () => 'This field is empty',
        min: 'This field must not contain less than 2 characters',
        max: 'This field may not be greater than 100 characters',
      },
      lname: {
        required: () => 'This field is empty',
        min: 'This field must not contain less than 2 characters',
        max: 'This field may not be greater than 100 characters',
      },
      username: {
        required: () => 'This field is empty',
        min: 'This field must not contain less than 2 characters',
        max: 'This field may not be greater than 100 characters',
      },
      password: {
        required: () => 'This field is empty',
        regex:
          'This field must not contain less than 8 characters, one symbol character and one capital letter',
      },
      email: {
        required: () => 'This field is empty',
        email: 'This is not a valid email address',
      },
      phone: {
        required: () => 'This field is empty',
        min: 'This field must not contain less than 9 characters',
        max: 'This field may not be greater than 10 characters',
      },
      salary: {
        required: () => 'This field is empty',
        numeric: 'This field must contain only numeric characters',
        min: 'This field must not contain less than 3 characters',
        max: 'This field may not be greater than 100 characters',
      },
    },
  },

  getUserErrorModel() {
    return this.userErrorData;
  }
};
