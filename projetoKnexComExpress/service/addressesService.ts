const addressesData = require('../data/addressesData')

exports.getAddresses = () => addressesData.getAddresses()
exports.getAddress = (id) => addressesData.getAddress(id)
exports.deleteAddress = (id) => addressesData.deleteAddress(id)
exports.postAddress = (address) => addressesData.postAddress(address)
exports.updateAddress = (address) => addressesData.updateAddress(address)
