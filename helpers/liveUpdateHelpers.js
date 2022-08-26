import { Deploy } from 'cordova-plugin-ionic';

const checkAndConfigureLiveUpdate = async () => {
  try {
      const currentConfig = await Deploy.getConfiguration();
    //This only works if your environments are mapped to the channels designated.
    //Otherwise, this check and corresponding function will need to be updated to meet your channel setup
    if (!isLiveUpdateChannel(currentConfig.channel)) {
      const envConfig = {
        appId: process.env.APP_ID,
        channel: process.env.LIVE_UPDATE_CHANNEL,
        updateMethod: 'none',
      };
      await Deploy.configure(envConfig);
    }
  } catch (error) {
    //Replace with your logging or other helpful debugging implementation 
    console.log({ exception: error });
  }
};

const checkLiveUpdate = async () => {
  try {
    const update = await Deploy.checkForUpdate();
    return update.available;
  } catch (error) {
    //Replace with your logging or other helpful debugging implementation 
    console.log({ exception: error });
  }
};

const downloadAndRefreshLiveUpdate = async () => {
  try {
    await Deploy.downloadUpdate();
    await Deploy.extractUpdate();
    await Deploy.reloadApp();
  } catch (error) {
    //Replace with your logging or other helpful debugging implementation 
    console.log({ exception: error });
  }
};

//This method is used to check the current environment designated in config
const isLiveUpdateChannel = (environment) => {
    return environment === process.env.ENVIRONMENT;
  };

export { checkAndConfigureLiveUpdate, checkLiveUpdate, downloadAndRefreshLiveUpdate };