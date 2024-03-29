import React, {useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};
  
const MapContainer = ({ google, data }) => {
    const [lat, setLat]= useState(null)
    const [lng, setLng] = useState(null)
    const [zoom] = useState(16)
    
  
    useEffect(() => {
    const locationInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
            }, (err) => {
                alert("Please allow location settings")
            });    
        }, 1000);
        return () => clearInterval(locationInterval)
    }, [lat, lng])
    return (
            <Map
                google={google}
                zoom={zoom}
                style={mapStyles}
                center={{ lat, lng}}
                disableDefaultUI
            >
                  <Marker
                      name={'Your position'}
                      position={{lat, lng}}
                      icon={{
                      url: "https://images.vexels.com/media/users/3/199804/isolated/preview/5bf601c009abd07c0e4e111e64f102a6-blue-scooter-delivery-by-vexels.png",
                      anchor: new google.maps.Point(lat,lat),
                      scaledSize: new google.maps.Size(60, 60)
                  }} />
                  {data&&<Marker
                      name={'Restaurant'}
                      position={{lat: data.restaurant.lat, lng:data.restaurant.long}}
                      icon={{
                      url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
                      anchor: new google.maps.Point(lat,lat),
                      scaledSize: new google.maps.Size(60, 60)
                  }} />}

                  {data&& <Marker
                      name={'Cutomer'}
                      position={{lat: data.location.lat, lng: data.location.lan}}
                      icon={{
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/600px-Ski_trail_rating_symbol-green_circle.svg.png",
                      anchor: new google.maps.Point(lat,lat),
                      scaledSize: new google.maps.Size(25, 25)
                  }} />}
                  
            </Map>
    )
  }


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);