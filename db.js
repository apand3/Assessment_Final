const { DataStore } = require('notarealdb');

const store = new DataStore('./data')

module.exports = {
  users: store.collection('users'),
  doctors:store.collection('doctors'),
  kinds:store.collection('kinds'),
  patients:store.collection('patients'),
  schedules:store.collection('schedules')
};
