import { UserValidation } from '../validations';
import { Toolbox } from '../utils';
import database from '../models';


const {
  errorResponse,
} = Toolbox;
const {
  validateProfile,
} = UserValidation;
const {
  User,
} = database;

const UserMiddleware = {
  /**
   * verify profile update
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} - return and object {error or response}
   * @memberof UserMiddleware
   */
  async verifyProfileUpdate(req, res, next) {
    try {
      validateProfile(req.body);
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },
};

export default UserMiddleware;
