const DB = require ('../../models');
const Vendor =  DB.Vendor;
const Review = DB.Review;
const User = DB.User;
const Service = DB.Service;
const Image = DB.Image;

module.exports = {
  create: (vendorData) => Vendor.create(vendorData),
  get: (vendorDetail) => Vendor.findOne({
    where: {
      $or:
          [
              { username: vendorDetail },
              { id: vendorDetail }
          ]
    },
    include: [{model: Service}, {model: Image}, {model: Review, include: [{model: User}]}]
  }),
  update: async (id, data) => {
    const vendor = await Vendor.findById(id);
    return vendor.update(data, {fields: Object.keys(data)})
  },
  delete: async (id) => {
    const vendor = await Vendor.findById(id);
    return vendor.destroy()
  }
};