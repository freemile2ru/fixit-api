const DB = require ('../../models');
const Review =  DB.Review;
const User = DB.User;

module.exports = {
	create: (reviewData) => Review.create(reviewData),
  listByVendorId: (vendorId, page=0) => Review.find({
    where: {
      vendorId
    },
    limit: 10,
    offset: page * 10,
    order: '"createdAt" DESC',
    include: [{model: User}]
  }),
  update: async (id, data) => {
      const review = await Review.findById(id);
      return review.update(data, {fields: Object.keys(data)})
  },
  delete: async (id) => {
      const review = await Review.findById(id);
      return review.destroy()
  }
};