import * as path from 'path';
import * as fs from 'fs-extra';
import * as Local from '@getflywheel/local';
import expandTilde from 'expand-tilde';

export default function updateNginxConfig(siteData){

  const nginxConfigPath = path.join(expandTilde(siteData.path), 'conf', 'nginx', 'site.conf.hbs');
  const updatedConfigPath = path.join(__dirname, '..', 'assets', 'site.conf.hbs');

  if( fs.existsSync( nginxConfigPath + '.bak' ) && fs.existsSync( nginxConfigPath ) ){
    return true;
  }
  fs.rename( nginxConfigPath, nginxConfigPath + '.bak' )
    .then(() => {
      fs.copyFile(updatedConfigPath, nginxConfigPath)
      .then(() => { return true })
      .catch(err => { throw err });
    })
    .catch( err => { throw err });

  return true;
}
