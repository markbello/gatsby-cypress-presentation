import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Carousel extends Component {
  state = {
    rowLimit: 2,
    startIndex: 0,
  };

  nextButtonHandler = () => {
    const { rowLimit, startIndex } = this.state;

    this.setState({ startIndex: startIndex + rowLimit });
  }

  previousButtonHandler = () => {
    const { rowLimit, startIndex } = this.state;

    this.setState({ startIndex: startIndex - rowLimit });
  }

  setRowLimit = ({ target: { value: rowLimit } }) => {
    this.setState({ rowLimit });
  };

  render() {
    const { images } = this.props;
    const { rowLimit, startIndex } = this.state;

    const imagesToShow = images.slice(startIndex, (startIndex + rowLimit));
    const shouldDisableNextButton = (startIndex + rowLimit) >= images.length;

    return (
      <div data-testid="carousel">
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%'}}>
          {imagesToShow.map(image => (
            <div
              data-testid="carousel-image"
              key={image.imageName}
              style={{ width: `calc(${100 / rowLimit}% - 10px)`, margin: '5px' }}
            >
              <img src={image.src} alt={image.imageCaption} style={{ borderRadius: '15px' }}/>
            </div>
          ))}
        </div>
        {!!images.length && (
          <div>
            <button
              data-testid="button-previous"
              disabled={startIndex === 0}
              onClick={this.previousButtonHandler}
              >
              previous
            </button>
            <button
              data-testid="button-next"
              disabled={shouldDisableNextButton}
              onClick={this.nextButtonHandler}
              >
              next
            </button>
            <div>
              <label htmlFor="row-limit">Row Limit</label>
              <select
                data-testid="dropdown-rowlimit"
                name="row-limit"
                onChange={this.setRowLimit}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
      )}
    </div>
    );
  }
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    imageCaption: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })),
};

Carousel.displayName = 'Carousel';

export default Carousel;
