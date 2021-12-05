import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import AppBanner from './AppBanner'
import Statusbar from './Statusbar'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
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
