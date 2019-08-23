import Constants from './Constants';

export default {
  dashboardData: [
    {
      size: 'xs6 sm4 md3',
      link: { name: Constants.ROUTES.REPORTS },
      path: '/images/dashboard/app_4_active.png',
      title: 'Reports',
      subheading: 'Here you can see the reports',
    },
    {
      size: 'xs6 sm4 md3',
      link: { name: Constants.ROUTES.EXPENSES },
      path: '/images/dashboard/app_3_active.png',
      title: 'Expenses',
      subheading: 'Here you can add expense',
    },
    {
      size: 'xs6 sm4 md3',
      link: { name: Constants.ROUTES.USERS },
      path: '/images/dashboard/app_1_active.png',
      title: 'Users',
      subheading: 'Here you can add users',
    },
  ],
  menuData: [
    {
      size: 'xs12 sm6',
      link: { name: Constants.ROUTES.REPORTS },
      path: '/images/dashboard/app_4_active.png',
      title: 'Reports',
    },
    {
      size: 'xs12 sm6',
      link: { name: Constants.ROUTES.EXPENSES },
      path: '/images/dashboard/app_3_active.png',
      title: 'Expenses',
    },
    {
      size: 'xs12 sm6',
      link: { name: Constants.ROUTES.USERS },
      path: '/images/dashboard/app_1_active.png',
      title: 'Users',
    },
  ],
  getDashboardData: function() {
    return this.dashboardData;
  },
  getMenuData: function() {
    return this.menuData;
  },  
};
