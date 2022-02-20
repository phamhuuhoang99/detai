module.exports = (sequelize, DataTypes) => {
  const Victim = sequelize.define("victim", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nhập tên Nạn nhân",
        },
      },
    },
    birthday: {
      type: DataTypes.DATE,
    },
    hometown: {
      type: DataTypes.STRING,
    },
    characteristic: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  return Victim;
};
