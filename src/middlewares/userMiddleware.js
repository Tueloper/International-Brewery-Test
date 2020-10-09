import { UserValidation, GeneralValidation } from '../validations';
import { Toolbox } from '../utils';
import { GeneralService } from '../services';
import database from '../models';


const {
  errorResponse,
} = Toolbox;
const {
  findByKey
} = GeneralService;
const {
  validateProfile,
  validateSupplierAccountDetails
} = UserValidation;
const {
  validateEmail,
  validateParameters
} = GeneralValidation;
const {
  User,
  RoleUser,
  SupplierAccount,
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

  /**
   * verify supplier account details
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} - return and object {error or response}
   * @memberof UserMiddleware
   */
  async verifySupplierAccount(req, res, next) {
    try {
      validateSupplierAccountDetails(req.body);
      const { actionType } = req.body;
      const supplierAccount = await findByKey(SupplierAccount, { supplierId: req.tokenData.id });
      if (actionType === 'create') {
        if (supplierAccount) return errorResponse(res, { code: 404, message: 'Supplier already has an Account in our database' });
      }
      if (actionType === 'update') {
        if (!supplierAccount) return errorResponse(res, { code: 404, message: 'Supplier has no account' });
        req.account = supplierAccount;
      }
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * verify email
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} - return and object {error or response}
   * @memberof UserMiddleware
   */
  async verifyEmail(req, res, next) {
    try {
      const { email } = req.body;
      validateEmail({ email });
      if (req.tokenData.email === email) return errorResponse(res, { code: 401, message: 'the old and new emails are the same' });
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * verify query keys
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} - return and object {error or response}
   * @memberof ProductMiddleware
   */
  async verifyUserId(req, res, next) {
    try {
      const id = Number(req.query.userId);
      validateParameters(id);
      const user = await findByKey(User, { id });
      if (!user) return errorResponse(res, { code: 404, message: 'User with id does not exist in our database' });
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },


  /**
   * verify product transfer details
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} - return and object {error or response}
   * @memberof ProductMiddleware
   */
  async verifyProductTransferUsers(req, res, next) {
    try {
      const { supplierEmail, recieverEmail } = req.body;
      validateEmail({ email: supplierEmail });
      validateEmail({ email: recieverEmail });
      const supplierUser = await findByKey(User, { email: supplierEmail });
      const recieverUser = await findByKey(User, { email: recieverEmail });
      const user = supplierUser === null ? 'Supplier' : 'Admin';
      if (!supplierUser || !recieverUser) return errorResponse(res, { code: 404, message: `${user} with email does not exist in our database` });
      req.supplierData = supplierUser;
      req.recieverData = recieverUser;
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * verify supplier username
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} - return and object {error or response}
   * @memberof UserMiddleware
   */
  async verifyUsername(req, res, next) {
    try {
      validateParameters(req.params);
      const { userName } = req.params;
      const user = await findByKey(User, { userName });
      if (!user) return errorResponse(res, { code: 404, message: `supplier with username ${userName} does not exist in our database` });
      const role = await findByKey(RoleUser, { userId: user.id });
      if (role.roleId > 3) return errorResponse(res, { code: 409, message: 'this user is not a supplier in our application' });
      req.supplierData = user;
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

};

export default UserMiddleware;
