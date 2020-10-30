import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

// const getCoordsObj = latLng => ({
//   lat: latLng.lat(),
//   lng: latLng.lng()
// });

// const mapOptions = {
//   center: {
//     lat: 37.773972,
//     lng: -122.431297
//   }, // San Francisco coords
//   zoom: 13
// };

class EventMap extends React.Component {
    componentDidMount() {
        // set the map to show SF
        const mapOptions = {
        center: { lat: 37.7758, lng: -122.435 }, // this is SF
        zoom: 13
        };

        // wrap this.mapNode in a Google Map
        this.map = new google.maps.Map(this.mapNode, mapOptions);
    }
    
    initMap(){
        var options ={
        zoom: 10,
        center: {lat:34.0522,lng:118.2437}
        }
        var map = new google.maps.Map(document.getElementById('map'), options);

        var markers = [{
            coords:{lat:34.0522,lng:118.2437},
            iconImage: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            content: "<h1>Los Angeles, CA</h1>"
        }]

        for(var i = 0; i< markers.length;i++){
            addMarker(markers[i]);
        }

        function addMarker(props){
            var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        //   icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        });
        if(props.iconImage){
            marker.setIcon(props.iconImage);
        }
        }
    }

    render(){
        return (
            // <div className="map" ref="map">
            //     Map
            // </div>
            <div ref={ map => this.mapNode = map }></div>
        )
    }


//   componentDidMount() {
//     const map = this.refs.map;
//     this.map = new google.maps.Map(map, mapOptions);
//     this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
//     if (this.props.singleBench) {
//       this.props.fetchBench(this.props.benchId);
//     } else {
//       this.registerListeners();
//       this.MarkerManager.updateMarkers(this.props.benches);
//     }
//   }

//   componentDidUpdate() {
//     if (this.props.singleBench) {
//       const targetBenchKey = Object.keys(this.props.benches)[0];
//       const targetBench = this.props.benches[targetBenchKey];
//       this.MarkerManager.updateMarkers([targetBench]); //grabs only that one bench
//     } else {
//       this.MarkerManager.updateMarkers(this.props.benches);
//     }
//   }

//   registerListeners() {
//     google.maps.event.addListener(this.map, 'idle', () => {
//       const { north, south, east, west } = this.map.getBounds().toJSON();
//       const bounds = {
//         northEast: { lat:north, lng: east },
//         southWest: { lat: south, lng: west } };
//       this.props.updateFilter('bounds', bounds);
//     });
//     google.maps.event.addListener(this.map, 'click', (event) => {
//       const coords = getCoordsObj(event.latLng);
//       this.handleClick(coords);
//     });
//   }

//   handleMarkerClick(bench) {
//     this.props.history.push(`benches/${bench.id}`);
//   }

//   handleClick(coords) {
//     this.props.history.push({
//       pathname: 'benches/new',
//       search: `lat=${coords.lat}&lng=${coords.lng}`
//     });
//   }

//   render() {
//     return (
//       <div className="map" ref="map">
//         Map
//       </div>
//     );
//   }
// }
}

export default withRouter(EventMap);