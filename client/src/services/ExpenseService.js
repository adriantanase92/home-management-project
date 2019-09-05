export default {
  dictionaryModel: {
    custom: {
      name: {
        required: () => 'This field is empty',
        min: 'This field must not contain less than 2 characters',
        max: 'This field may not be greater than 100 characters',
      },
      type: {
        required: () => 'This field is empty',
      },
      fixedType: {
        required: () => 'This field is empty',
      },
      month: {
        required: () => 'This field is empty',
      },
      cost: {
        required: () => 'This field is empty',
        numeric: 'This field must contain only numeric characters',
        min: 'This field must not contain less than 1 characters',
        max: 'This field may not be greater than 100 characters',
      },
      paidBy: {
        required: () => 'This field is empty',
      },
      details: {
        min: 'This field must not contain less than 3 characters',
        max: 'This field may not be greater than 500 characters',
      },
    },
  },
  getDictionaryModel: function() {
    return this.dictionaryModel;
  },
};
