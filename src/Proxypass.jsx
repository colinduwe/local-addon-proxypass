import {
	TableListRow,
	TextButton,
	Switch,
	FlyModal,
	Title,
	PrimaryButton,
} from '@getflywheel/local-components';

import React, { Component } from 'react';
import classnames from 'classnames';
import { ipcRenderer } from 'electron';
import ProxyURLModal from './ProxyURLModal';

const ReactDOM = require('react-dom');

export default class Proxypass extends Component {

	constructor(props, context) {

		super(props, context);

		if(!document.getElementById('popup-container')) {
			const container = document.createElement('div');
			container.id = 'popup-container'; // match id expected in the component
			document.body.appendChild(container);
		}

		this.state = {
			proxyURL: this.fetchSiteProxyURL(),
			enableProxy: this.fetchSiteEnableProxy(),
		};

		this.onProxyURLChange = this.onProxyURLChange.bind(this);
		this.toggleEnableProxy = this.toggleEnableProxy.bind(this);
		this.onChangeURLClick = this.onChangeURLClick.bind(this);

	}

	componentDidUpdate(previousProps) {

		if (previousProps.site.id !== this.props.site.id) {
			this.setState({
				proxyURL: this.fetchSiteProxyURL(),
				enableProxy: this.fetchSiteEnableProxy(),
			});
		}

	}

	syncProxyURLToSite() {
		ipcRenderer.send('update-site-proxy-url', this.props.site.id, this.state.proxyURL, this.state.enableProxy);
	}

	fetchSiteProxyURL() {

		const proxyURL = this.props.site.proxyURL;
		if(!proxyURL) {
			return '';
		}

		return proxyURL;

	}

	fetchSiteEnableProxy() {

		const enableProxy = this.props.site.enableProxy;
		if(!enableProxy) {
			return false;
		}

		return Boolean(enableProxy);

	}

	toggleEnableProxy() {
		this.setState( prevState => {
			return{
				...prevState,
				enableProxy: !prevState.enableProxy
			}
		}, this.syncProxyURLToSite);
	}

	async onProxyURLChange(event) {
		// validate URL and nginx server

		this.setState({
			proxyURL: event.target.value,
		});
	}

	onChangeURLClick () {
		function confirm (args) {
				return new Promise((resolve) => {
					const onSubmit = (proxyURL) => {
						resolve(proxyURL);
					};

					ReactDOM.render(<ProxyURLModal
						proxyURL={args.proxyURL}
						onSubmit={onSubmit}
					/>, document.getElementById('popup-container'));
				});
			}

			confirm({
				proxyURL: this.state.proxyURL,
				onProxyURLChange: this.onProxyURLChange,

			}).then((proxyURL) => {
				this.setState({
					proxyURL: proxyURL,
				}, this.syncProxyURLToSite);
			});
	}

	render() {

		return <TableListRow key="proxy-images-from-production" label="Proxy Images">
			<span
				//type="url"
				//name="name"
				placeholder="https://www.example.com"
				value={this.state.proxyURL}
		  >
				{this.state.proxyURL}
			</span>
			<TextButton
				onClick={this.onChangeURLClick}
			>
				CHANGE
			</TextButton>
			<Switch flat={true} tiny={true} checked={this.state.enableProxy} onChange={this.toggleEnableProxy}/>
			<p>
				<small>Enter the URL of your production site (with a trailing /) to fetch images that are missing from your Local site.</small>
			</p>
		</TableListRow>;

	}

}
