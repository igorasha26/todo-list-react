import localAPI from './local.js';
import serverAPI from './server.js';

const isLocal = import.meta.env.VITE_STATIC_BACKEND === 'true';

const tasksAPI = isLocal ? localAPI : serverAPI;

export default tasksAPI;