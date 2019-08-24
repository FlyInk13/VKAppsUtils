import React from 'react';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import connect from '@vkontakte/vkui-connect';

class PromiseAPI {
  constructor(token) {
    this.connect  = connect;
    this.requests = {};
    this.access_token = false;
    this.view = false;
    this.v = 5.92;
    this.cart = [];
    this.log = false;
    this.pause = false;

    this.connect.subscribe((e) => {
      switch (e.detail.type) {
        case 'VKWebAppCallAPIMethodFailed':
          this.parseError(e.detail.data);
          break;
        case 'VKWebAppCallAPIMethodResult':
          this.parseResponse(e.detail.data);
          break;
      }
    });
  }

  debug(...args) {
    if (!this.log) return;
    console.log(...args);
  }

  cartCheck(request_id, ignoreCart) {
    if (!this.pause && (!this.interval || ignoreCart)) {
      const request = this.requests[request_id];
      this.connect.send('VKWebAppCallAPIMethod', request.data);
      this.debug('cartCheck', 'call', request);
      return;
    }
    this.debug('cartCheck', 'push');
    this.cart.push(request_id);
  }

  cartTick() {
    this.debug('cartTick', this.cart.length);
    if (!this.cart.length) {
      clearInterval(this.interval);
      delete this.interval;
      return;
    }
    const request_id = this.cart.shift();
    this.cartCheck(request_id, true);
  }

  cartInit() {
    this.debug('cartInit');
    if (this.interval) return;
    this.interval = setInterval(() => this.cartTick(), 334);
  }

  showCaptcha(method, params, error) {
    if (!this.view) {
      throw error;
    }

    this.pause = 1;
    return new Promise((resolve) => {
      const view = this.view;
      view.setState({
        popout: (
          <Alert
        actionsLayout="vertical"
        actions={[{
            title: 'OK',
            autoclose: true,
          }]}
        onClose={() => {
        resolve(view.state.captchaCode);
        view.setState({ popout: null, captchaCode: null });
      }}
    >
    <h2>Введите код с картинки</h2>
      <img src={error.captcha_img} style={{ width: 238, borderRadius: 3 }} alt={error.captcha_img} />
      <Input defaultValue='' onChange={(e) => {
        const captchaCode = e.currentTarget.value;
        view.setState({ captchaCode });
      }}/>
      </Alert>
    )
    });
    }).then((captcha_key) => {
      this.pause = 0;
      const captcha_sid = error.captcha_sid;
      return this.callMethod(method, {
        ...params,
        captcha_key,
        captcha_sid,
      });
    });
  }

  getMethod(method) {
    return this.callMethod.bind(this, method);
  }

  callMethod = (method, params) => {
    return new Promise((resolve, reject) => {
      const request_id = (Math.random() * 1e20).toString(32);
      const data = { method, params, request_id };

      params.access_token = this.access_token;
      params.v = this.v;

      this.requests[request_id] = {resolve, reject, data};
      this.cartCheck(request_id);
    }).catch((error) => {
      error = error || {};
      const apiError = error.error_reason || error;
      const errorCode = apiError.error_code || 0;

      switch (errorCode) {
        case 6:
          this.cartInit();
          return this.callMethod(method, params);
        case 14:
          return this.showCaptcha(method, params, apiError);
      }

      throw apiError;
    });
  };

  parseError = (data) => {
    const {error_data, request_id} = data;
    if (!this.requests[request_id]) return;
    this.requests[request_id].reject(error_data);
    delete this.requests[request_id];
  };

  parseResponse = (data) => {
    const {response, request_id} = data;
    if (!this.requests[request_id]) return;
    this.requests[request_id].resolve(response);
    delete this.requests[request_id];
  };
}

export default PromiseAPI;
