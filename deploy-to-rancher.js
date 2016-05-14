'use strict';
const superagent = require('superagent');

const checkFinishedUpgrade = (id, rancher) => {
  return new Promise((resolve, reject) => {
    superagent.post(`${rancher.baseUrl}/v1/projects/1a5/services/${id}/?action=finishupgrade`)
    .auth(rancher.accessKey, rancher.secretKey)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.body);
    });
  })
};

module.exports = (moduleName, isNew) => {
  const rancher = {
    accessKey: process.env.RANCHER_ACCESS_KEY,
    secretKey: process.env.RANCHER_SECRET_KEY,
    baseUrl: process.env.RANCHER_BASE_URL
  }
  if (isNew) {
    return new Promise((resolve, reject) => {
      const command = {"scale":1,"assignServiceIpAddress":false,"startOnCreate":true,"type":"service","name":`module-${moduleName}`,"state":"active","accountId":"1a5","createIndex":4,"created":"2016-05-14T13:59:07Z","createdTS":1463234347000,"description":null,"environmentId":"1e2","externalId":null,"fqdn":null,"healthState":"healthy","kind":"service","metadata":null,"publicEndpoints":null,"removed":null,"retainIp":null,"selectorContainer":null,"selectorLink":null,"transitioning":"no","transitioningMessage":null,"transitioningProgress":null,"upgrade":{"inServiceStrategy":{"batchSize":1,"intervalMillis":2000,"launchConfig":{"capAdd":[],"capDrop":[],"command":["start"],"count":null,"cpuSet":null,"cpuShares":null,"dataVolumes":[],"dataVolumesFrom":[],"description":null,"devices":[],"dns":[],"dnsSearch":[],"domainName":null,"entryPoint":["/usr/local/bin/npm"],"environment":{"INLINE_BROKER_HOST":"broker","INLINE_BROKER_PORT":"7557","INLINE_NODE_NAMESPACE":`module-${moduleName}`,"INLINE_WEB_HOOK_BASE_URL":"https://example.com/","DEBUG":"inline:*"},"hostname":null,"imageUuid":`docker:inlinebot/module-${moduleName}`,"kind":"container","labels":{"io.rancher.container.pull_image":"always"},"logConfig":{"config":{},"driver":""},"memory":null,"memoryMb":null,"memorySwap":null,"networkMode":"managed","pidMode":null,"ports":[],"privileged":false,"publishAllPorts":false,"readOnly":false,"requestedIpAddress":null,"startOnCreate":true,"stdinOpen":true,"tty":true,"user":null,"userdata":null,"version":"f6898a41-0210-4e8a-b264-8c44b2d15eff","volumeDriver":null,"workingDir":`/${moduleName}`,"dataVolumesFromLaunchConfigs":[],"networkLaunchConfig":null,"vcpu":1},"previousLaunchConfig":{"capAdd":[],"capDrop":[],"command":["start"],"count":null,"cpuSet":null,"cpuShares":null,"dataVolumes":[],"dataVolumesFrom":[],"description":null,"devices":[],"dns":[],"dnsSearch":[],"domainName":null,"entryPoint":["/usr/local/bin/npm"],"environment":{"INLINE_BROKER_HOST":"broker","INLINE_BROKER_PORT":"7557","INLINE_NODE_NAMESPACE":`module-${moduleName}`,"INLINE_WEB_HOOK_BASE_URL":"https://example.com/","DEBUG":"inline:*"},"hostname":null,"imageUuid":`docker:inlinebot/module-${moduleName}`,"kind":"container","labels":{"io.rancher.container.pull_image":"always"},"logConfig":{"config":{},"driver":""},"memory":null,"memoryMb":null,"memorySwap":null,"networkMode":"managed","pidMode":null,"ports":[],"privileged":false,"publishAllPorts":false,"readOnly":false,"requestedIpAddress":null,"startOnCreate":true,"stdinOpen":true,"tty":true,"user":null,"userdata":null,"version":"ac3d0f14-f0da-45fc-bed8-1fc2f7f33b05","volumeDriver":null,"workingDir":`/${moduleName}`,"dataVolumesFromLaunchConfigs":[],"networkLaunchConfig":null,"vcpu":1},"previousSecondaryLaunchConfigs":[],"secondaryLaunchConfigs":[],"startFirst":true},"toServiceStrategy":null},"vip":null,"launchConfig":{"kind":"container","networkMode":"managed","privileged":false,"publishAllPorts":false,"readOnly":false,"startOnCreate":true,"stdinOpen":true,"tty":true,"vcpu":1,"capAdd":[],"capDrop":[],"command":["start"],"count":null,"cpuSet":null,"cpuShares":null,"dataVolumes":[],"dataVolumesFrom":[],"description":null,"devices":[],"dns":[],"dnsSearch":[],"domainName":null,"entryPoint":["/usr/local/bin/npm"],"environment":{"INLINE_BROKER_HOST":"broker","INLINE_BROKER_PORT":"7557","INLINE_NODE_NAMESPACE":`module-${moduleName}`,"INLINE_WEB_HOOK_BASE_URL":"https://example.com/","DEBUG":"inline:*"},"hostname":null,"imageUuid":`docker:inlinebot/module-${moduleName}`,"labels":{"io.rancher.container.pull_image":"always"},"logConfig":{"config":{},"driver":""},"memory":null,"memoryMb":null,"memorySwap":null,"pidMode":null,"ports":[],"requestedIpAddress":null,"user":null,"userdata":null,"version":"f6898a41-0210-4e8a-b264-8c44b2d15eff","volumeDriver":null,"workingDir":`/${moduleName}`,"dataVolumesFromLaunchConfigs":[],"networkLaunchConfig":null,"type":"launchConfig","createIndex":null,"created":null,"deploymentUnitUuid":null,"externalId":null,"firstRunning":null,"healthState":null,"removed":null,"startCount":null,"systemContainer":null,"uuid":null},"secondaryLaunchConfigs":[],"uuid":null}
      superagent.post(`${rancher.baseUrl}/v1/projects/1a5/service`)
      .auth(rancher.accessKey, rancher.secretKey)
      .set('Accept', 'application/json')
      .send(command)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    }).then((json) => {
      return new Promise((resolve, reject) => {
        const command = {"serviceLinks":[{"name":"","serviceId":"1s3"}]};
        superagent.post(`${rancher.baseUrl}/v1/projects/1a5/services/${json.id}?action=setservicelinks`)
        .auth(rancher.accessKey, rancher.secretKey)
        .set('Accept', 'application/json')
        .send(command)
        .end((err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
      })
    });
  } else {
    return new Promise((resolve, reject) => {
      const command = {"scale":1,"assignServiceIpAddress":false,"startOnCreate":true,"type":"service","name":`module-${moduleName}`,"state":"active","accountId":"1a5","createIndex":4,"created":"2016-05-14T13:59:07Z","createdTS":1463234347000,"description":null,"environmentId":"1e2","externalId":null,"fqdn":null,"healthState":"healthy","kind":"service","metadata":null,"publicEndpoints":null,"removed":null,"retainIp":null,"selectorContainer":null,"selectorLink":null,"transitioning":"no","transitioningMessage":null,"transitioningProgress":null,"upgrade":{"inServiceStrategy":{"batchSize":1,"intervalMillis":2000,"launchConfig":{"capAdd":[],"capDrop":[],"command":["start"],"count":null,"cpuSet":null,"cpuShares":null,"dataVolumes":[],"dataVolumesFrom":[],"description":null,"devices":[],"dns":[],"dnsSearch":[],"domainName":null,"entryPoint":["/usr/local/bin/npm"],"environment":{"INLINE_BROKER_HOST":"broker","INLINE_BROKER_PORT":"7557","INLINE_NODE_NAMESPACE":`module-${moduleName}`,"INLINE_WEB_HOOK_BASE_URL":"https://example.com/","DEBUG":"inline:*"},"hostname":null,"imageUuid":`docker:inlinebot/module-${moduleName}`,"kind":"container","labels":{"io.rancher.container.pull_image":"always"},"logConfig":{"config":{},"driver":""},"memory":null,"memoryMb":null,"memorySwap":null,"networkMode":"managed","pidMode":null,"ports":[],"privileged":false,"publishAllPorts":false,"readOnly":false,"requestedIpAddress":null,"startOnCreate":true,"stdinOpen":true,"tty":true,"user":null,"userdata":null,"version":"f6898a41-0210-4e8a-b264-8c44b2d15eff","volumeDriver":null,"workingDir":`/${moduleName}`,"dataVolumesFromLaunchConfigs":[],"networkLaunchConfig":null,"vcpu":1},"previousLaunchConfig":{"capAdd":[],"capDrop":[],"command":["start"],"count":null,"cpuSet":null,"cpuShares":null,"dataVolumes":[],"dataVolumesFrom":[],"description":null,"devices":[],"dns":[],"dnsSearch":[],"domainName":null,"entryPoint":["/usr/local/bin/npm"],"environment":{"INLINE_BROKER_HOST":"broker","INLINE_BROKER_PORT":"7557","INLINE_NODE_NAMESPACE":`module-${moduleName}`,"INLINE_WEB_HOOK_BASE_URL":"https://example.com/","DEBUG":"inline:*"},"hostname":null,"imageUuid":`docker:inlinebot/module-${moduleName}`,"kind":"container","labels":{"io.rancher.container.pull_image":"always"},"logConfig":{"config":{},"driver":""},"memory":null,"memoryMb":null,"memorySwap":null,"networkMode":"managed","pidMode":null,"ports":[],"privileged":false,"publishAllPorts":false,"readOnly":false,"requestedIpAddress":null,"startOnCreate":true,"stdinOpen":true,"tty":true,"user":null,"userdata":null,"version":"ac3d0f14-f0da-45fc-bed8-1fc2f7f33b05","volumeDriver":null,"workingDir":`/${moduleName}`,"dataVolumesFromLaunchConfigs":[],"networkLaunchConfig":null,"vcpu":1},"previousSecondaryLaunchConfigs":[],"secondaryLaunchConfigs":[],"startFirst":true},"toServiceStrategy":null},"vip":null,"launchConfig":{"kind":"container","networkMode":"managed","privileged":false,"publishAllPorts":false,"readOnly":false,"startOnCreate":true,"stdinOpen":true,"tty":true,"vcpu":1,"capAdd":[],"capDrop":[],"command":["start"],"count":null,"cpuSet":null,"cpuShares":null,"dataVolumes":[],"dataVolumesFrom":[],"description":null,"devices":[],"dns":[],"dnsSearch":[],"domainName":null,"entryPoint":["/usr/local/bin/npm"],"environment":{"INLINE_BROKER_HOST":"broker","INLINE_BROKER_PORT":"7557","INLINE_NODE_NAMESPACE":`module-${moduleName}`,"INLINE_WEB_HOOK_BASE_URL":"https://example.com/","DEBUG":"inline:*"},"hostname":null,"imageUuid":`docker:inlinebot/module-${moduleName}`,"labels":{"io.rancher.container.pull_image":"always"},"logConfig":{"config":{},"driver":""},"memory":null,"memoryMb":null,"memorySwap":null,"pidMode":null,"ports":[],"requestedIpAddress":null,"user":null,"userdata":null,"version":"f6898a41-0210-4e8a-b264-8c44b2d15eff","volumeDriver":null,"workingDir":`/${moduleName}`,"dataVolumesFromLaunchConfigs":[],"networkLaunchConfig":null,"type":"launchConfig","createIndex":null,"created":null,"deploymentUnitUuid":null,"externalId":null,"firstRunning":null,"healthState":null,"removed":null,"startCount":null,"systemContainer":null,"uuid":null},"secondaryLaunchConfigs":[],"uuid":null}
      superagent.get(`${rancher.baseUrl}/v1/projects/1a5/services?environmentId=1e2&limit=-1&include=instances`)
      .auth(rancher.accessKey, rancher.secretKey)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }
        const match = res.body.data.filter((item) => item.name === `module-${moduleName}`);
        if (match.length === 0) {
          reject(new Error('not found'));
          return;
        }
        resolve(match[0].id);
      });
    }).then((id) => {
      return new Promise((resolve, reject) => {
        const command = {"inServiceStrategy":{"batchSize":1,"intervalMillis":2000,"startFirst":true,"launchConfig":{"kind":"container","networkMode":"managed","privileged":false,"publishAllPorts":false,"readOnly":false,"startOnCreate":true,"stdinOpen":true,"tty":true,"vcpu":1,"capAdd":[],"capDrop":[],"command":["start"],"count":null,"cpuSet":null,"cpuShares":null,"dataVolumes":[],"dataVolumesFrom":[],"description":null,"devices":[],"dns":[],"dnsSearch":[],"domainName":null,"entryPoint":["/usr/local/bin/npm"],"environment":{"INLINE_BROKER_HOST":"broker","INLINE_BROKER_PORT":"7557","INLINE_NODE_NAMESPACE":`module-${moduleName}`,"INLINE_WEB_HOOK_BASE_URL":"https://example.com/","DEBUG":"inline:*"},"hostname":null,"imageUuid":`docker:inlinebot/module-${moduleName}`,"labels":{"io.rancher.container.pull_image":"always"},"logConfig":{"config":{},"driver":""},"memory":null,"memoryMb":null,"memorySwap":null,"pidMode":null,"ports":[],"requestedIpAddress":null,"user":null,"userdata":null,"version":"0","volumeDriver":null,"workingDir":`/${moduleName}`,"dataVolumesFromLaunchConfigs":[],"networkLaunchConfig":null,"type":"launchConfig","createIndex":null,"created":null,"deploymentUnitUuid":null,"externalId":null,"firstRunning":null,"healthState":null,"removed":null,"startCount":null,"systemContainer":null,"uuid":null},"secondaryLaunchConfigs":[]}};
        superagent.post(`${rancher.baseUrl}/v1/projects/1a5/services/${id}/?action=upgrade`)
        .auth(rancher.accessKey, rancher.secretKey)
        .set('Accept', 'application/json')
        .send(command)
        .end((err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(id);
        });
      })
    }).then((id) => {
      return new Promise((resolve, reject) => {
        let count = 0;
        const interval = setInterval(() => {
          count++;
          checkFinishedUpgrade(id, rancher).then(() => {
            resolve();
          }, () => {
            if (count === 120) {
              reject();
            }
          })
        }, 1000);
      });
    });
  }
  
};