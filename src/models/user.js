module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: true
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  User.associate = () => {};
  return User;
};
