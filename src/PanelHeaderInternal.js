import { PanelHeader } from "@vkontakte/vkui";

class PanelHeaderInternal extends PanelHeader {
  get webviewType () {
    const isWeb = this.props.isWeb;
    return isWeb ? 'internal' : 'vkapps';
  }
}

export default PanelHeaderInternal;
