import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { PhotoSwipe } from 'react-photoswipe'
import Image from './Image'
import { Link } from "gatsby"

import _kebabCase from 'lodash/kebabCase'

import './Gallery.css'
import 'react-photoswipe/lib/photoswipe.css'

export const query = graphql`
  fragment Gallery on MarkdownRemark {
    frontmatter {
      gallery {
        alt
        image
        title
        link
      }
    }
  }
`

export default class Gallery extends Component {
  state = {
    loaded: false,
    isOpen: false,
    sliderImages: [],
    index: 0
  }

  isOpen(isOpen, index) {
    if (typeof index === 'undefined') index = 0
    this.setState({ isOpen, index })
  }

  getImageInfo = (img, index) =>
    fetch(img.image + '-/json/')
      .then(res => res.json())
      .then(
        result => {
          const newImagesArr = [...this.state.sliderImages]
          newImagesArr[index] = {
            src: img.image,
            title: img.title,
            link: img.link,
            w: result.width,
            h: result.height
          }
          this.setState({
            sliderImages: newImagesArr
          })
          return true
        },
        error => {
          console.log(error)
          return false
        }
      )

  componentDidMount() {
    const { images } = this.props,
      maxCount = images.length
    let loopCount = 1

    for (let i in images) {
      if (this.getImageInfo(images[i], i)) {
        this.setState({ loaded: loopCount === maxCount })
        loopCount++
      }
    }
  }

  render() {
    const { images } = this.props
    return (
      <Fragment>
        {images &&
          images.length > 0 && (
            <div className="Gallery">
              {images.map((image, index) => (
                <figure
                  className="Gallery--Item"
                  key={_kebabCase(image.alt) + '-' + index}
                  onClick={() => this.isOpen(true, index)}
                >
                  <div>
                    <a href={image.link}>
                    <Image
                      resolutions="small"
                      src={image.image}
                      alt={image.alt}
                    />
                    </a>
                  </div>

                  {image.title && <figcaption>{image.title}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        {this.state.loaded &&
          this.state.sliderImages.length > 0 && (
            <PhotoSwipe
              isOpen={this.state.isOpen}
              items={this.state.sliderImages}
              options={{
                index: this.state.index,
                history: false
              }}
              onClose={() => this.isOpen(false)}
            />
          )}
      </Fragment>
    )
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired
}
