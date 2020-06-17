import * as LocalMain from '@getflywheel/local/main';
import nginxConf from './nginxConf';

export default function(context) {

	const { electron } = context;
	const { ipcMain, dialog } = electron;

	const { notifier } : { notifier: any } = context;

	ipcMain.on('update-site-proxy-url', async (event, siteId, proxyURL, enableProxy) => {

		LocalMain.SiteData.updateSite(siteId, {
			id: siteId,
			proxyURL,
			enableProxy,
		});

		try {
				await nginxConf(LocalMain.SiteData.getSite(siteId));

				notifier.notify({
						title: 'Proxy Production Images',
						message: `Local's nginx config has been updated. Restart for changes to take effect`,
				});
		} catch (e) {
				notifier.notify({
						title: 'Proxy Production Images Error',
						message: `Unable update the nginx config.`,
				});

				dialog.showErrorBox('Proxy Production Images Error', e.stack);
		}


	});

}
