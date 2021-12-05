import AppBanner from './AppBanner';
import Toolbar from './Toolbar';
import Statusbar from './Statusbar';
import WorkspaceScreen from './WorkspaceScreen';

export default function WorkspaceWrapper() {
    return (
        <div>
            <AppBanner />
            <Toolbar />
            <WorkspaceScreen />
            <Statusbar />
        </div>
    );
}
