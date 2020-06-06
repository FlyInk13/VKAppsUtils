import React from 'react';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import bridge from "@vkontakte/vk-bridge";

class PromiseAPI {
  constructor(data) {
    // user data
    this.access_token = (data ? data.access_token : false) || false;
    this.view = (data ? data.view : false) || false;
    this.v = (data ? data.v : false) || '5.92';

    // requests map { request_id: request_data };
    this.requests = {};
    // requests cart [request_id, request_id, ...];
    this.cart = [];

    // internal vars
    this.log = false;
    this.pause = false;

    // bridge transport
    this.subscribe();
  }

  subscribe() {
    this.bridge = bridge;
    this.bridge.subscribe(({ detail: { type, data }}) => {
      switch (type) {
        case 'VKWebAppCallAPIMethodFailed':
          this.parseError(data);
          break;
        case 'VKWebAppCallAPIMethodResult':
          this.parseResponse(data);
          break;
      }
    });
  }

  sendRequest(request) {
    this.bridge.send('VKWebAppCallAPIMethod', request.data);
  }

  debug(...args) {
    if (!this.log) return;
    console.log(...args);
  }

  cartCheck(request_id, ignoreCart) {
    if (!this.pause && (!this.interval || ignoreCart)) {
      const request = this.requests[request_id];
      this.sendRequest(request);
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
      const oldPopout = view.state.popout;
      view.setState({
        popout: (
          <Alert
            actionsLayout="vertical"
            actions={[
              {
                title: 'OK',
                autoclose: true,
              }
            ]}
            onClose={() => {
              resolve(view.state.captchaCode);
              view.setState({ popout: oldPopout, captchaCode: null });
            }}
          >
            <h2>Введите код с картинки</h2>
            <img src={error.captcha_img} style={{ width: 238, borderRadius: 3 }} alt={error.captcha_img}/>
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

  callMethod = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const request_id = (Math.random() * 1e20).toString(32);
      const data = {
        method,
        params: {
          access_token: this.access_token,
          v: this.v,
          ...params,
        },
        request_id,
      };

      this.requests[request_id] = { resolve, reject, data };
      this.cartCheck(request_id);
    }).catch((error) => {
      error = error || {};
      const apiError = (typeof error.error_reason == 'object' ? error.error_reason : error.error_data) || error;
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
    const { error_data, request_id } = data;
    if (!this.requests[request_id]) return;
    this.requests[request_id].reject(error_data);
    delete this.requests[request_id];
  };

  parseResponse = (data) => {
    const { response, request_id } = data;
    if (!this.requests[request_id]) return;
    this.requests[request_id].resolve(response);
    delete this.requests[request_id];
  };
}

export default PromiseAPI;
