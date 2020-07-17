import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapstyle = {
    width: '100%',
    height: '60vh',
    color: 'black'
}

export class ShelterMap extends Component {
    static displayName = ShelterMap.name;

    constructor(props) {
        super(props);

        this.state = {
            currentLatLng: {
                crtLat: 59.9139,
                crtLong: 10.7522
            },
            shelters: [],
            closestShelter: [],
            address: "",
            markers: this.props.markers
        };
        this.getMyGeoLocation();
        this.findShelter = this.findShelter.bind(this);
    }

    componentDidMount() {
        this.intervalId = setInterval(this.updateMarker.bind(this), 1000);
    }

    updateMarker() {
    }

    getMyGeoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log("my laptops location:");

                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);

                    this.setState({
                        currentLatLng:
                        {
                            crtLat: position.coords.latitude,
                            crtLong: position.coords.longitude
                        }
                    })

                    this.setState({
                        markers: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                    this.populateShelterData();
                }
            )

        }
    }

    getClosestShelterByGeoLocation() {
        this.findNearestShelter(this.state.currentLatLng.crtLat,
            this.state.currentLatLng.crtLong);
    }


    findNearestShelter(latitude, longitude) {
        var minDif = 99999;
        var closest;

        for (var index = 0; index < this.state.shelters.features.length; ++index) {
            var dif = this.CalculateDistance(latitude, longitude, this.state.shelters.features[index].geometry.coordinates[1], this.state.shelters.features[index].geometry.coordinates[0]);
            if (dif < minDif) {
                closest = index;
                minDif = dif;
            }
        }

        console.log("closest shelter coords:");

        console.log(" Longitude: ");
        console.log(this.state.shelters.features[closest].geometry.coordinates[0]);

        console.log(" Latitude: ");
        console.log(this.state.shelters.features[closest].geometry.coordinates[1]);

        console.log(" address: ");
        console.log(this.state.shelters.features[closest].properties.adresse);

        this.setState({
            closestShelter: this.state.shelters.features[closest].geometry.coordinates,
            address: this.state.shelters.features[closest].properties.adresse
        })

        this.setState({
            markers: {
                lat: this.state.shelters.features[closest].geometry.coordinates[1],
                lng: this.state.shelters.features[closest].geometry.coordinates[0]
            }
        });

    }

    findShelter() {
        this.getClosestShelterByGeoLocation();
    }

    //This function takes in latitude and longitude of two locations and returns the distance between them 
    CalculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.ToRad(lat2 - lat1);
        var dLon = this.ToRad(lon2 - lon1);
        var lat1 = this.ToRad(lat1);
        var lat2 = this.ToRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    ToRad(Value) {
        return Value * Math.PI / 180;
    }

    render() {
        return (
            <div id="sheltermap">
               <div className="row">
               <div className="columns contact-details">
                    <br/><br/>
                    <h2 style={{color: "white"}} >Public Shelter Finder</h2>
                    <p aria-live="polite">The marker on the map is showing you your current location, after clicking the button, the address to the closest shelter will appear below</p>
                    <button className="btn btn-primary" onClick={this.findShelter}>Find Shelter</button><br/>
                    <p style={{color: "white"}}><strong>{this.state.address}</strong></p>
                    <div style={{ height: '80vh', width: '100%' }}>
                    <Map
                        google={this.props.google}
                        style={mapstyle}
                        center={this.state.markers}
                        zoom={15}
                        onClick={this.onMapClicked}
                    >
                        {true && <Marker position={this.state.markers} />}
                    </Map>
                    </div>
                </div>
            </div>
            </div>
        );
    }

    populateShelterData() {
        fetch('https://raw.githubusercontent.com/dsb-norge/static-share/ceec27157fbf0d215dc893a2871c82e825bb7f88/shelters.json')
        .then(response => response.json())
        .then(data => {
            this.setState({ shelters: data });
        });
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBWTxyFJgAjONaHNx3i5s2sOjNcvcd9W8Q'
})(ShelterMap);