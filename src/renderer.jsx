import Proxypass from './Proxypass';
import path from 'path';

export default function(context) {

	const { React, hooks } = context;

	hooks.addContent('SiteInfoUtilities_TableList', (site) => {
			if(site.services.hasOwnProperty('nginx')){
				return <Proxypass key="proxypass" site={site} sendEvent={context.events.send} notifier={context.notifier} />;
			}else{
				return;
			}
	});

}
