const DB = require ('../../models');
const Favorite =  DB.Favorite;
const Vendor = DB.Vendor;
const Service = DB.Service;

module.exports = {
	create: (favoriteData) => Favorite.create(favoriteData),
  listByUserId: (userId, page=0) => Favorite.find({
      where: {
        userId
      },
      limit: 10,
      offset: page * 10,
      order: '"createdAt" DESC',
      include: [{model: Vendor, include: [{model: Service}]}]
  }),
  update: async (id, data) => {
      const favorite = await Favorite.findById(id);
      return favorite.update(data, {fields: Object.keys(data)})
  },
  delete: async (id) => {
      const favorite = await Favorite.findById(id);
      return favorite.destroy()
  }
};