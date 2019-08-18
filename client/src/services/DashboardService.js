import Constants from './Constants';

export default {
  dashboardData: [
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
