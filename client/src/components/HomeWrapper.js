import { useContext } from 'react'

import AppBanner from './AppBanner'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import Statusbar from './Statusbar'

import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    
    if (auth.loggedIn) {
        return (
            <div>
                <AppBanner />
                <HomeScreen />
                <Statusbar />
            </div>
        );
    } else {
        return <SplashScreen />;
    }
}
