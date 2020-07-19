import React from 'react';
// import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
// import i18n from 'i18next'
// import {withNamespaces} from 'react-i18next'

class InfoWindow extends React.Component {
  componentDidMount () {
    this.renderInfoWindow ()
  }

  componentDidUpdate (prevProps) {
    const {google, map} = this.props

    if (!google || !map) {
      return
    }

    if (map !== prevProps.map) {
      this.renderInfoWindow ()
    }

    if (this.props.position !== prevProps.position) {
      this.updatePosition ()
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent ()
    }

    if (
      this.props.visible !== prevProps.visible ||
      this.props.marker !== prevProps.marker ||
      this.props.position !== prevProps.position
    ) {
      this.props.visible ? this.openWindow () : this.closeWindow ()
    }
  }

  renderInfoWindow () {
    const {map, google, mapCenter} = this.props

    if (!google || !google.maps) {
      return
    }

    const iw = (this.infowindow = new google.maps.InfoWindow ({
      content: '',
    }))

    google.maps.event.addListener (iw, 'closeclick', this.onClose.bind (this))
    google.maps.event.addListener (iw, 'domready', this.onOpen.bind (this))
    google.maps.event.addListener (iw, 'click', this.onClick.bind (this))
  }

  onOpen () {
    let handler = this.onClick.bind (this)
    document.getElementById ('closeButton').addEventListener ('click', handler)

    if (this.props.onOpen) {
      this.props.onOpen ()
    }
  }

  onClose () {
    if (this.props.onClose) {
      this.props.onClose ()
    }
  }

  onClick () {
    if (this.props.onClick) {
      this.props.onClick ()
    }
  }

  openWindow () {
    this.infowindow.setContent (
      this.infowindow.getContent () +
        `<div><button id='closeButton' type='button' className='button'>${this.props.button}</button></div>`
    )
    this.infowindow.open (this.props.map, this.props.marker)
  }

  updatePosition () {
    let pos = this.props.position
    if (!(pos instanceof google.maps.LatLng)) {
      pos = pos && new google.maps.LatLng (pos.lat, pos.lng)
    }
    this.infowindow.setPosition (pos)
  }

  updateContent () {
    const content = this.renderChildren ()
    this.infowindow.setContent (content)
  }

  closeWindow () {
    this.infowindow.close ()
  }

  renderChildren () {
    const {children} = this.props
    return ReactDOMServer.renderToString (children)
  }

  render () {
    return null
  }
}

export default InfoWindow;