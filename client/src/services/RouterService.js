import RestConstants from './RestConstants';
import Constants from './Constants';
import FormFactory from './FormFactory';
import FormErrorFactory from './FormErrorFactory';
import HeadersFactory from './HeadersFactory';

import Login from '@/views/Authentication/Login.vue';
import Dashboard from '@/views/Dashboard/Index.vue';
import Users from '@/views/list.vue';
import AddUser from '@/views/add.vue';
// import UpdateUser from '@/views/Users/Update.vue';
import UpdateUser from '@/views/update.vue';
import Expenses from '@/views/Expenses/Index.vue';
import AddExpense from '@/views/Expenses/Add.vue';
import UpdateExpense from '@/views/Expenses/Update.vue';
import Reports from '@/views/Reports/Index.vue';

export default {
  getRoutes() {
    return [
      {
        path: '/',
        name: 'login',
        component: Login,
        meta: {
          title: 'Login',
        },
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: '/users',
        name: 'users',
        component: Users,
        meta: {
          title: 'Users',
          config: {
            url: RestConstants.USERS,
            addRoute: Constants.ROUTES.ADD_USER,
            updateRoute: Constants.ROUTES.UPDATE_USER,
            headers: HeadersFactory.getUserHeaders(),
          },
        },
      },
      {
        path: '/users/add',
        name: 'add-user',
        component: AddUser,
        meta: {
          title: 'Users - Add User',
          config: {
            url: RestConstants.USERS,
            listRoute: Constants.ROUTES.USERS,
            itemModel: {
              fname: null,
              lname: null,
              username: null,
              password: null,
              email: null,
              phone: null,
              salary: null,
            },
            fields: FormFactory.getUserModel(),
            errorsItems: FormErrorFactory.getUserErrorModel(),
          },
        },
      },
      {
        path: '/users/update/:id',
        name: 'update-user',
        component: UpdateUser,
        meta: {
          title: 'Users - Update User',
          config: {
            url: RestConstants.USERS,
            listRoute: Constants.ROUTES.USERS,
            responseItem: null,
            itemModel: {
              fname: null,
              lname: null,
              username: null,
              password: null,
              email: null,
              phone: null,
              salary: null,
            },
            fields: FormFactory.getUserModel(),
            errorsItems: FormErrorFactory.getUserErrorModel(),
          },
        },
      },
      {
        path: '/expenses',
        name: 'expenses',
        component: Expenses,
        meta: {
          title: 'Expenses',
        },
      },
      {
        path: '/expenses/add',
        name: 'add-expense',
        component: AddExpense,
        meta: {
          title: 'Expenses - Add Expense',
        },
      },
      {
        path: '/expenses/update/:id',
        name: 'update-expense',
        component: UpdateExpense,
        meta: {
          title: 'Expenses - Update Expense',
        },
      },
      {
        path: '/reports',
        name: 'reports',
        component: Reports,
        meta: {
          title: 'Reports',
        },
      },
    ];
  },
};
