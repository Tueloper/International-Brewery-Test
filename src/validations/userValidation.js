import joi from '@hapi/joi';

const UserValidation = {
  /**
   * validate user profile data
   * @param {object} payload - user object
   * @returns {object | boolean} - returns an error object or valid boolean
   */
  validateProfile(payload) {
    const schema = {
      firstName: joi.string().min(3).max(25)
        .label('Please enter a valid firstname \n the field must not be empty and it must be more than 2 letters'),
      lastName: joi.string().min(3).max(25)
        .label('Please enter a valid lastName \n the field must not be empty and it must be more than 2 letters'),
      gender: joi.string().valid('male', 'female')
        .label('please input a gender (male or female)'),
      birthDate: joi.date().iso().label('Please input a valid date format: yy-mm-dd'),
      // eslint-disable-next-line no-useless-escape
      phoneNumber: joi.string().regex(/^[0-9+\(\)#\.\s\/ext-]+$/).label('Please input a valid phone number'),
      profileImage: joi.string().uri().label('Please profileImage must be in form of an image URL'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default UserValidation;
