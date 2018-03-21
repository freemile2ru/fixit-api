const DB = require ('../../models');
const Service =  DB.Service;
const Review = DB.Review;

module.exports = {
	create: (serviceData) => Service.create(serviceData),
  get: (name) => Service.findOne({
    where: {
      name
    },
  }),
  update: async (id, data) => {
      const service = await Service.findById(id);
      return service.update(data, {fields: Object.keys(data)})
  },
  delete: async (id) => {
      const service = await Service.findById(id);
      return service.destroy()
  }
};