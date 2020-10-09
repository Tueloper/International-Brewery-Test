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
      companyName: joi.string().min(3).max(50)
        .label('company name has a limit of 50 characters'),
      companyAddress: joi.string().min(3).max(120)
        .label('company address has a limit of 120 characters'),
      companyDescription: joi.string().min(3).max(300)
        .label('company description has a limit of 300 characters'),
      profileImage: joi.string().uri().label('Please profileImage must be in form of an image URL'),
      companyBanner: joi.string().uri().label('Please company banner must be in form of an image URL'),
      companyUrl: joi.string().uri().label('Please company website must be in form of a URL'),
      companyEmail: joi.string().email()
        .label('Please enter a valid email address'),
      companyTheme: joi.string().regex(/^#[A-Fa-f0-9]{6}$/).label('colour nust be a Hex in format #ffffff'),
      companyLocation: joi.array().items(joi.string())
        .label('Please upload company locations in the right string format'),
      // eslint-disable-next-line no-useless-escape
      companyPhoneNumber: joi.string().regex(/^[0-9+\(\)#\.\s\/ext-]+$/).label('Please input a valid phone number'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default UserValidation;
