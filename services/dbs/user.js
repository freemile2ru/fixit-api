const DB = require ('../../models');
const User =  DB.User;

module.exports = {
	create: (userData) => User.create(userData),
  get: (userDetail) => User.findOne({
    where: {
      $or:
          [
              { username: userDetail },
              { id: vendorDetail }
          ]
      }
  }),
  getById: (id) => User.findById(id),
	update: async (id, data) => {
		const user = await User.findById(id);
		return user.update(data, {fields: Object.keys(data)})
  },
  delete: async (id) => {
    const user = await User.findById(id);
    return user.destroy()
  }
};