import React, { Component } from 'react'

import { leafletmap, TileLayer, Marker, Popup } from 'react-leaflet'

export default class SimpleExample extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <leafletmap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </leafletmap>
    )
  }
}
