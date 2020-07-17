import React, { Component } from 'react';

export class ShelterList extends Component {
  static displayName = ShelterList.name;

  constructor(props) {
    super(props);
    this.state = { shelters: [], loading: true, list: null, contents: [] };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  componentDidMount() {
    this.populateShelterData();
  }

  static renderSheltersTable(shelters) {
    return (
      <table className='table table-dark' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th align="left" scope="col">Address</th>
            <th align="left" scope="col">District</th>
            <th align="left" scope="col">Municipality</th>
            <th align="left" scope="col">Rooms</th>
          </tr>
        </thead>
        <tbody>
          {shelters.features.map(shelter =>
              <tr scope="row" key={shelter.displayName}>
                  <td>{shelter.properties.adresse}</td>
                  <td>{shelter.properties.distriktsnavn}</td>
                  <td>{shelter.properties.kommune}</td>
                  <td>{shelter.properties.plasser}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  _onButtonClick(contents) {
    if(this.state.list != null) {
      this.setState({
        list: null,
      });
    } else {
      this.setState({
        list: contents,
      });
    }
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ShelterList.renderSheltersTable(this.state.shelters);

    return (
      <div id="shelterlist">
        <div className="row">
          <div className="columns contact-details">
            <br/> <br/> 
            <h2 id="tabelLabel" style={{color: "white"}}> Homes and Shelters </h2>
            <p>Click the button below to see more detailied information about all public shelters in Norway.</p>
            <button className="btn btn-primary" onClick={() => this._onButtonClick(contents)}>See All Shelters</button><br/>
            {this.state.list}
            <br/>
          </div>
        </div>
      </div>
    );
  }

  async populateShelterData() {
    const response = await fetch('https://raw.githubusercontent.com/dsb-norge/static-share/ceec27157fbf0d215dc893a2871c82e825bb7f88/shelters.json');
    const data = await response.json();
    this.setState({ shelters: data, loading: false });
  }
}

export default ShelterList;