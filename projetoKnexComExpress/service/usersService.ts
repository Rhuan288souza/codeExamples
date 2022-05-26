const usersData = require('../data/usersData')

exports.getUsers = () => usersData.getUsers()
exports.getUser = (id) => usersData.getUser(id)
exports.deleteUser = (id) => usersData.deleteUser(id)
exports.postUser = (user) => usersData.postUser(user)
exports.updateUser = (user) => usersData.updateUser(user)
