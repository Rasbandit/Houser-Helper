module.exports = {

  register(req, res) {
    const { username, password } = req.body;

    req.app.get('db').duplicateUser([username]).then((duplicateUser) => {
      if (duplicateUser[0]) {
        res.status(401).send();
      } else {
        req.app.get('db').registerUser([username, password]).then(() => {
          req.app.get('db').login([username, password]).then((user) => {
            req.session.user = user[0];
            res.status(200).send();
          });
        });
      }
    });
  },

  login(req, res) {
    const { username, password } = req.body;
    req.app.get('db').login([username, password]).then((user) => {
      if (user[0]) {
        req.session.user = user[0];
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    });
  },

  getAllHouses(req, res) {
    req.app.get('db').getAllHouses().then(houses => res.status(200).send(houses));
  },

  favorite(req, res) {
    req.app.get('db').checkDuplicateFavorite([req.session.user.id, req.params.id]).then((matches) => {
      if(matches[0]) {
        req.app.get('db').getUsersFavorites([req.session.user.id]).then((favorites) => {
          res.send(favorites);
        });
      } else {
        req.app.get('db').addFavorite([req.session.user.id, req.params.id]).then(() => {
          req.app.get('db').getUsersFavorites([req.session.user.id]).then((favorites) => {
            res.send(favorites);
          });
        });
      }
    });
  },

  getFavoritesId(req, res) {
    req.app.get('db').getUsersFavorites([req.session.user.id])
      .then((favorites) => {
        res.send(favorites);
      });
  }

};
