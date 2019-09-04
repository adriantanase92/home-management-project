export default {
  userHeaders: [
    {
      text: '',
      sortable: false,
      value: 'actions'
    },
    {
      text: 'Username',
      value: 'username',
    },
    {
      text: 'Name',
      value: 'fullname',
    },
    {
      text: 'Phone',
      value: 'phone',
    },
    {
      text: 'Email',
      value: 'email',
    },
    {
      text: 'Salary',
      value: 'salary',
    },
  ],
  getUserHeaders() {
    return this.userHeaders;
  },
};
