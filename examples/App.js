import React, { useEffect, useState } from 'react';
import { checkAndConfigureLiveUpdate, checkLiveUpdate, downloadAndRefreshLiveUpdate } from '../helpers/liveUpdateHelpers';

const App = () => {
    const [isDownloadingLiveUpdate, setIsDownloadingLiveUpdate] = useState(false);

    useEffect(() => {
        checkLiveUpdates();
    }, []);
    
    const checkLiveUpdates = async () => {
        setIsDownloadingLiveUpdate(true);
        //Ensure that channel configuration is correct for the environment
        await checkAndConfigureLiveUpdate();
        //If there is an available update, this will ensure the update occurs in the splash screen
        if (await checkLiveUpdate()) {
            await downloadAndRefreshLiveUpdate();
        }
        setIsDownloadingLiveUpdate(false);
    };
    
    return (isDownloadingLiveUpdate ? <div>Splash Screen</div> : <div>Live Update Applied Successfully</div>)
}

export default App;