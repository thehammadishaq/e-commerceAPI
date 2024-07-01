const CustomError = require('../errors/index');


const checkPermission = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return true;
    if (requestUser.id === resourceUserId) return true;
    throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

module.exports = checkPermission