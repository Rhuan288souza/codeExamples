const projectsData = require('../data/projectsData')

exports.getProjects = () => projectsData.getProjects()
exports.getProject = (id) => projectsData.getProject(id)
exports.deleteProject = (id) => projectsData.deleteProject(id)
exports.postProject = (project) => projectsData.postProject(project)
exports.updateProject = (project) => projectsData.updateProject(project)
