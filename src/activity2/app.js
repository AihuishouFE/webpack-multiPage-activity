import {Router} from 'util';

import index from './index';

new Router([
    {
        path: '/index',
        render: index
    }
], '/index');