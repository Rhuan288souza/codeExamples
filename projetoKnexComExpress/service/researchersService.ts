const researchersData = require('../data/researchersData')

exports.getResearchers = () => researchersData.getResearchers()
exports.getResearcher = (id) => researchersData.getResearcher(id)
exports.deleteResearcher = (id) => researchersData.deleteResearcher(id)
exports.postResearcher = (researcher) => researchersData.postResearcher(researcher)
exports.updateResearcher = (researcher) => researchersData.updateResearcher(researcher)
