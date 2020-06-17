import {
	FlyModal,
	Title,
	PrimaryButton,
} from '@getflywheel/local-components';

import React, { Component } from 'react';
import classnames from 'classnames';
import validator from 'validator';

function validate(proxyURL) {
  return {
    proxyURL: ( validator.isURL(proxyURL) && validator.matches( proxyURL, /.*\/$/ ) ),
  }
}

export default class ProxyURLModal extends Component {

  constructor(props, context) {

		super(props, context);

		this.state = {
			proxyURL: this.props.proxyURL,
		};

		this.onProxyURLChange = this.onProxyURLChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

	}

  onProxyURLChange(event) {

    this.setState({
      proxyURL: event.target.value,
    });
  }

  onSubmit (event) {
    // TODO: validate URL
    FlyModal.onRequestClose();
    this.props.onSubmit(this.state.proxyURL);
  };

  render() {
    const errors = validate(this.state.proxyURL);
    const isDisabled = !errors.proxyURL;
    return(
      <FlyModal className="proxy-images-url-modal">
        <div classeName="FlyModal-inner-container">
          <Title>Change Production Server URL</Title>
          <p>Please enter the URL of your production server including the trailing /</p>
          <hr/>
          <input
            type="text"
            placeholder="https://www.example.com"
            value={this.state.proxyURL}
            onChange={this.onProxyURLChange}
            className={errors.proxyURL ? "" : "error"}
          />
          <PrimaryButton
            type="submit"
            onClick={this.onSubmit}
            disabled={isDisabled}
          >
            Update
          </PrimaryButton>
        </div>
      </FlyModal>
    );
  }
}
