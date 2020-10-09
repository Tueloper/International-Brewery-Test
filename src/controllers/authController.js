/* eslint-disable no-unused-vars */
import { GeneralService } from '../services';
import { Toolbox } from '../utils';
import database from '../models';

const {
  successResponse,
  errorResponse,
  createToken,
  hashPassword,
  comparePassword,
} = Toolbox;
const {
  addEntity,
  updateByKey,
  findByKey
} = GeneralService;
const {
  User,
} = database;

const AuthController = {
  /**
   * user signup
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AuthController
   */
  async signup(req, res) {
    try {
      const body = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword(req.body.password),
      };
      const user = await addEntity(User, { ...body });
      user.token = createToken({
        email: user.email,
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        verified: user.verified
      });
      res.cookie('token', user.token, { maxAge: 70000000, httpOnly: true });
      return successResponse(res, { user }, 201);
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * user login
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - a JSON response
   * @memberof AuthController
   */
  async login(req, res) {
    try {
      const { password } = req.body;
      const user = req.userData;
      // const { roleId } = await findByKey(RoleUser, { userId: user.id });
      if (!comparePassword(password, user.password)) return errorResponse(res, { code: 401, message: 'incorrect password or email' });
      user.token = createToken({
        email: user.email,
        id: user.id,
        // roleId,
        userName: user.userName,
        firstName: user.firstName,
        verified: user.verified
      });
      res.cookie('token', user.token, { maxAge: 70000000, httpOnly: true });
      return successResponse(res, { message: 'Login Successful', token: user.token });
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * reset user password
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - a JSON response
   * @memberof AuthController
   */
  async resetPassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const { id } = req.tokenData;
      let user = await findByKey(User, { id });
      if (!user) return errorResponse(res, { code: 404, message: 'Sorry, user in token does not exist' });
      if (!comparePassword(oldPassword, user.password)) return errorResponse(res, { code: 401, message: 'Old password is incorrect' });
      const hashedPassword = hashPassword(newPassword);
      user = await updateByKey(User, { password: hashedPassword }, { id });
      successResponse(res, { message: 'Password has been changed successfully' });
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * logs user out
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - a JSON response
   * @memberof AuthController
   */
  async logoutUser(req, res) {
    try {
      const token = '';
      res.cookie('token', token, { maxAge: 0, httpOnly: true });
      return successResponse(res, { message: 'Logout Successful', token });
    } catch (error) {
      errorResponse(res, {});
    }
  },
};

export default AuthController;
