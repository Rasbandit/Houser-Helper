import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getHouses, getFavorites } from '../../ducks/reducer';

import HouseCardDashboard from './HouseCardDashboard';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      // houses: [],
      favoriteHouses: [],
      desiredRent: Infinity
    };

    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
  }

  componentDidMount() {
    this.props.getHouses();
    this.props.getFavorites();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      favoriteHouses: nextProps.favoriteHouses
    });
  }


  favorite(houseId) {
    axios.post(`/api/favorites/${houseId}`).then((favHouses) => {
      this.setState({
        favoriteHouses: favHouses.data
      });
    });
  }

  unfavorite(houseId) {
    axios.delete(`/api/favorites/${houseId}`).then((favHouses) => {
      this.setState({
        favoriteHouses: favHouses.data
      });
    });
  }

  handleType(desiredRent) {
    if (desiredRent && parseInt(desiredRent, 10) && desiredRent[desiredRent.length - 1] !== /d/) {
      this.setState({
        desiredRent: parseInt(desiredRent, 10)
      });
    } else {
      this.setState({
        desiredRent: Infinity
      });
    }
  }

  clearInput() {
    this.setState({
      desiredRent: Infinity
    });
  }

  render() {
    const houses = this.props.houses.filter(house => house.desired_rent <= this.state.desiredRent).map(house => (
      <HouseCardDashboard
        house={house}
        favoriteHouses={this.props.favoriteHouses}
        key={house.id}
        favorite={this.favorite}
        unfavorite={this.unfavorite}
      />
    ));
    return (
      <div className="dashboard">
        <div className="top">
          <div className="button">Add new property</div>
          <div className="filter">
            List properties with "desired rent" less than $<input type="text" value={this.state.desiredRent === Infinity ? '' : this.state.desiredRent} onChange={(e) => { this.handleType(e.target.value); }} /><div className="reset-btn" onClick={() => { this.clearInput(); }}>Reset</div>
          </div>
        </div>
        <div className="houses">
          {houses}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    houses: state.houses,
    favoriteHouses: state.favoriteHouses
  };
}

export default connect(mapStateToProps, { getHouses, getFavorites })(Dashboard);
