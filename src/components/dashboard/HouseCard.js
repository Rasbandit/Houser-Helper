import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class HouseCard extends Component {
  constructor(props) {
    super(props);

    let favortied = false;
    props.favoriteHouses.forEach((item) => {
      if (item.house_id === props.house.id) {
        favortied = true;
      }
    });

    this.state = {
      house: props.house,
      favorited: favortied
    };
  }

  componentWillReceiveProps(newProps) {
    let flag = false;
    newProps.favoriteHouses.forEach((item) => {
      if(item.house_id === this.state.house.id) {
        flag = true;
        this.setState({
          favorited: true
        });
      }
    });
    if(flag === false) {
      this.setState({
        favorited: false
      });
    }
  }

  render() {
    const { house } = this.state;

    return (
      <div className="house-card">
        <div className="img-container">
          <img src={house.img} alt={house.description} />
        </div>
        <div className="center">
          <h3>{house.title}</h3>
          <p>{house.description}</p>
        </div>
        <div className="right">
          <div className="spread">
            <h4><span>Loan:</span> ${house.loan}</h4>
            {
              this.state.favorited ?
                (<div onClick={() => { this.props.unfavorite(house.id); }}>
                  <FontAwesome
                    name="star"
                    style={{ color: 'gold' }}
                  /></div>) :
                (<div onClick={() => { this.props.favorite(house.id); }}>
                  <FontAwesome
                    name="star-o"
                    style={{ color: 'gold' }}
                  />
                </div>)
            }
          </div>
          <h4><span>Monthly Mortgage:</span> ${house.mortgage}</h4>
          <h4><span>Recommended Rent:</span> ${house.desired_rent}</h4>
          <h4><span>Desired Rent:</span> ${house.desired_rent}</h4>
          <h4><span>Address:</span> {house.address}</h4>
          <h4><span>City:</span> {house.city}</h4>
        </div>
      </div>
    );
  }
}

export default HouseCard;
