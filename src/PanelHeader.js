import React from 'react';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';

import Icon24Fullscreen from '@vkontakte/icons/dist/24/fullscreen';
import Icon24FullscreenExit from '@vkontakte/icons/dist/24/fullscreen_exit';
import PanelHeaderInternal from "./PanelHeaderInternal";


class PanelHeaderFull extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullScreenEnabled: false
    };
  }

  onFullScreenUpdate = () => {
    const fullScreenEnabled = !!document.fullscreenElement;
    this.setState({ fullScreenEnabled });
  };

  fullScreenToggle() {
    const self = PanelHeaderFull;
    if (!document.fullscreenElement) {
      self.openFullscreen(document.documentElement);
    } else {
      self.closeFullscreen();
    }
    this.onFullScreenUpdate();
  }

  static openFullscreen() {
    var elem = document.body;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  static closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  componentDidMount() {
    window.addEventListener('fullscreenchange', this.onFullScreenUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener('fullscreenchange', this.onFullScreenUpdate);
  }

  render() {
    const props = this.props;

    if (!props.isWeb) {
      return (
        <PanelHeader {...props}/>
    );
    }

    const newProps = {};
    newProps.theme = 'alternate';
    newProps.right = (
      <HeaderButton onClick={() => this.fullScreenToggle()}>
    { this.state.fullScreenEnabled ? (
      <Icon24FullscreenExit/>
    ) : (
    <Icon24Fullscreen/>
    )}
  </HeaderButton>
  );

    return (
      <PanelHeaderInternal {...props} {...newProps}/>
  )
  }
}

export default PanelHeaderFull;
