import RestConstants from "./RestConstants";
import Constants from "./Constants";
import FormFactory from "./FormFactory";
import FormErrorFactory from "./FormErrorFactory";

import Login from "@/views/Authentication/Login.vue";
import Dashboard from "@/views/Dashboard/Index.vue";
import Users from "@/views/Users/Index.vue";
// import AddUser from "@/views/Users/Add.vue";
import AddUser from '@/views/add.vue';
import UpdateUser from "@/views/Users/Update.vue";
import Expenses from "@/views/Expenses/Index.vue";
import AddExpense from "@/views/Expenses/Add.vue";
import UpdateExpense from "@/views/Expenses/Update.vue";
import Reports from "@/views/Reports/Index.vue";

export default {
  getRoutes: function() {
    return [
      {
        path: "/",
        name: "login",
        component: Login,
        meta: {
          title: "Login"
        }
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          title: "Dashboard"
        }
      },
      {
        path: "/users",
        name: "users",
        component: Users,
        meta: {
          title: "Users"
        }
      },
      {
        path: "/users/add",
        name: "add-user",
        component: AddUser,
        meta: {
          title: "Users - Add User",
          config: {
            url: RestConstants.USERS,
            listRoute: Constants.ROUTES.USERS,
            customOptions: {},
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
            errorsItems: FormErrorFactory.getUserErrorModel()
          }
        }
      },
      {
        path: "/users/update/:id",
        name: "update-user",
        component: UpdateUser,
        meta: {
          title: 'Users - Update User'
        }
      },
      {
        path: "/expenses",
        name: "expenses",
        component: Expenses,
        meta: {
          title: "Expenses"
        }
      },      
      {
        path: "/expenses/add",
        name: "add-expense",
        component: AddExpense,
        meta: {
          title: 'Expenses - Add Expense'
        }
      },
      {
        path: "/expenses/update/:id",
        name: "update-expense",
        component: UpdateExpense,
        meta: {
          title: 'Expenses - Update Expense'
        }
      },
      {
        path: "/reports",
        name: "reports",
        component: Reports,
        meta: {
          title: "Reports"
        }
      },
    ];
  }
};
