import './bootstrap';
import * as bootstrap from 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import '../scss/app.scss'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { registerLicense } from '@syncfusion/ej2-base';


registerLicense(import.meta.env.VITE_SYNCFUSION_LICENCE)
createInertiaApp({
    //title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        let splittedName = name.split('::')
        let mainDirectory = splittedName?.[0] || 'Pages'
        let pageName = splittedName?.[1] || name
        switch (mainDirectory) {
            case 'Admin':
                return resolvePageComponent(`./inertia/Admin/${pageName}.jsx`, import.meta.glob('./inertia/Admin/**/*.jsx'))
            default :
                return resolvePageComponent(`./inertia/Pages/${pageName}.jsx`, import.meta.glob('./inertia/Pages/**/*.jsx'))
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#C7866A',
    },
});




