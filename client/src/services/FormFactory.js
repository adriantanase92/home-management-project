export default {
  userModel: [
    {
      size: 'xs12 sm6',
      id: 'at_fname_field',
      type: 'text',
      ref: 'fname',
      validate: 'required|min:2|max:100',
      label: 'First Name',
      errors: null,
      name: 'fname',
      icon: 'fas fa-user-alt',
    },
    {
      size: 'xs12 sm6',
      id: 'at_lname_field',
      type: 'text',
      ref: 'lname',
      validate: 'required|min:2|max:100',
      label: 'Last Name',
      errors: null,
      name: 'lname',
      icon: 'fas fa-user-alt',
    },
    {
      size: 'xs12 sm6',
      id: 'at_username_field',
      type: 'text',
      ref: 'username',
      validate: 'required|min:2|max:100',
      label: 'Username',
      errors: null,
      name: 'username',
      icon: 'fas fa-user-circle',
    },
    {
      size: 'xs12 sm6',
      id: 'at_password_field',
      type: 'password',
      ref: 'password',
      validate: {
        rules: {
          required: true,
          regex: /(?=^.{8,32}$)(?=.*[0-9!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        },
      },
      label: 'Password',
      errors: null,
      name: 'password',
      icon: 'fas fa-lock',
      visibility: false,
      counter: true,
    },
    {
      size: 'xs12 sm4',
      id: 'at_email_field',
      type: 'text',
      ref: 'email',
      validate: 'required|email',
      label: 'E-mail',
      errors: null,
      name: 'email',
      icon: 'fas fa-envelope',
    },
    {
      size: 'xs12 sm4',
      id: 'at_phone_field',
      type: 'text',
      ref: 'phone',
      validate: 'required|min:9|max:10',
      label: 'Phone',
      errors: null,
      name: 'phone',
      icon: 'fas fa-phone-alt',
    },
    {
      size: 'xs12 sm4',
      id: 'at_salary_field',
      type: 'text',
      ref: 'salary',
      validate: 'required|numeric|min:3|max:100',
      label: 'Salary',
      errors: null,
      name: 'salary',
      icon: 'fas fa-piggy-bank',
    },
  ],

  getUserModel() {
    return this.userModel;
  },
};
