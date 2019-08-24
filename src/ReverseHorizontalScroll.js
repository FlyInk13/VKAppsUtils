import React from 'react';
import HorizontalScroll from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';

class ReverseHorizontalScroll extends React.Component {
  constructor(props) {
    super(props);
    this.onWheel = this.onWheel.bind(this);
    this.scrollArea = React.createRef();
  }

  componentDidMount() {
    this.scrollElement = this.scrollArea.current.querySelector('.HorizontalScroll__in');
    if (this.scrollElement) {
      this.scrollElement.addEventListener('wheel', this.onWheel, false);
    }
  }

  componentWillUnmount() {
    if (this.scrollElement) {
      this.scrollElement.removeEventListener('wheel', this.onWheel);
    }
  }

  onWheel(e) {
    if (!this.scrollElement) {
      return;
    }

    const props = this.props;
    const reverse = props.reverse ? -1 : 1;
    const scrollDelta = (e.deltaY || 0) * reverse;
    const oldValue = this.scrollElement.scrollLeft;

    this.scrollElement.scrollLeft -= scrollDelta;

    if (props.onWheel) {
      return props.onWheel(e);
    }

    if (this.scrollElement.scrollLeft === oldValue) {
      return;
    }

    e.cancelBubble = true;
    e.preventDefault();
    return false;
  }

  render() {
    const props = this.props;
    return (
      <div ref={this.scrollArea} style={{ overflow: 'auto' }}>
        <HorizontalScroll {...props}/>
      </div>
    );
  }
}

export default ReverseHorizontalScroll;
