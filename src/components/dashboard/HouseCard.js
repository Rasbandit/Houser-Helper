import React, { Component } from 'react';

class HouseCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      house: props.house,
      favorited: false
    };
  }

  render() {
    console.log(this.state);
    const { house } = this.state;

    return (
      <div className="house-card">
        <div className="img-container">
          <img src={house.img} alt={house.description} />
        </div>
        <div className="center">
          <h3>{house.name}</h3>
          <p>{house.description}</p>
        </div>
        <div className="right">
          <div className="spread">
            <h4>Loan: ${house.loan}</h4>
            <div onClick={() => { this.props.favorite(house.id); }}>⭐</div>
          </div>
          <h4>Desired Rent: {house.desiredrent}</h4>
          <h4>Address: {house.address}</h4>
          <h4>City: {house.city}</h4>
        </div>
      </div>
    );
  }
}

export default HouseCard;
