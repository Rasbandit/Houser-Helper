/*
  this is a test
*/

module.exports = {

  async register(req, res) {
    const { username, password } = req.body;

    const duplicateUser = await req.app.get('db').duplicateUser([username]);
    if (duplicateUser[0]) {
      res.status(401).send();
    } else {
      await req.app.get('db').registerUser([username, password]);
      const user = await req.app.get('db').login([username, password]);
      req.session.user = user[0];
      res.status(200).send();
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
    const user = await req.app.get('db').login([username, password]);
    if (user[0]) {
      req.session.user = user[0];
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  },

  getAllHouses(req, res) {
    req.app.get('db').getAllHouses().then(houses => res.status(200).send(houses));
  },

  async favorite(req, res) {
    const DB = req.app.get('db');
    if(req.session.user) {
      const matches = DB.checkDuplicateFavorite([req.session.user.id, req.params.id]);
      if (matches[0]) {
        res.send(await DB.getUsersFavorites([req.session.user.id]));
      } else {
        await DB.addFavorite([req.session.user.id, req.params.id]);
        res.send(await DB.getUsersFavorites([req.session.user.id]));
      }
    } else {
      res.send([]);
    }
  },

  async getFavoritesId(req, res) {
    if(req.session.user) {
      res.send(await req.app.get('db').getUsersFavorites([req.session.user.id]));
    } else {
      res.send([]);
    }
  },

  async unfavorite(req, res) {
    const DB = req.app.get('db');
    if(req.session.user) {
      await DB.deleteFavorite([req.session.user.id, req.params.id]);
      res.send(await DB.getUsersFavorites([req.session.user.id]));
    } else {
      res.send([]);
    }
  },

  async getHouse(req, res) {
    const DB = req.app.get('db');
    const house = await DB.getHouse(req.params.id);
    if(house[0]) {
      const images = await DB.getImages(req.params.id);
      house[0].images = images;
      res.send(house[0]);
    } else {
      res.status(404).send();
    }
  },

  async addHouse(req, res) {
    const DB = req.app.get('db');
    const { title, desc, address, city, state, zip, images, loanAmount, monthlyMortgage, recomendedRent, desiredRent } = req.body;
    const house = await DB.createListing([images[0], loanAmount, title, desc, desiredRent, address, zip, city, state, recomendedRent, monthlyMortgage, req.session.user.id]);
    images.forEach((img) => {
      DB.addImage(house[0].id, img);
    });
    res.send();
  },

  async getListed(req, res) {
    const DB = req.app.get('db');
    if(req.session.user) {
      const listed = await DB.getListed(req.session.user.id);
      res.status(200).send(listed);
    } else {
      res.status(200).send([]);
    }
  }

};
