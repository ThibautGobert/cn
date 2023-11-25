import './bootstrap';
import * as bootstrap from 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import '../scss/app.scss'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';


createInertiaApp({
    //title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./inertia/Pages/${name}.jsx`, import.meta.glob('./inertia/Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#C7866A',
    },
});




