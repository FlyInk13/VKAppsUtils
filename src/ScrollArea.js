import React from 'react';
import { PanelHeader, HeaderButton, Alert, Input } from '@vkontakte/vkui';

class ScrollArea extends React.Component {
  constructor(props) {
    super(props);
    this.scrollArea = React.createRef();
  }

  onTouch = (event) => {
    const el = event.currentTarget;
    const posOld = el.pos;
    const posNew = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };

    if (event.type !== 'touchstart') {
      const offsetX = posOld.x - posNew.x;
      const offsetY = posOld.y - posNew.y;

      el.scrollLeft += offsetX;
      el.scrollTop += offsetY;
    }

    el.pos = posNew;
  };

  getElements() {
    return this.scrollArea.current.querySelectorAll(this.props.selector);
  }

  componentDidMount() {
    this.getElements().forEach((el) => {
      el.addEventListener('touchstart', this.onTouch, false);
      el.addEventListener('touchmove', this.onTouch, false);
    });
  }

  componentWillUnmount() {
    this.getElements().forEach((el) => {
      el.removeEventListener('touchstart', this.onTouch);
      el.removeEventListener('touchmove', this.onTouch);
    });
  }

  render() {
    return <div ref={this.scrollArea} className='scrollArea' {...this.props} />;
  }
}

export default ScrollArea;
