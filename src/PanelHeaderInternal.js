import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

class PanelHeaderInternal extends PanelHeader {
  get webviewType () {
    const isWeb = this.props.isWeb;
    return isWeb ? 'internal' : 'vkapps';
  }
}

export default PanelHeaderInternal;
