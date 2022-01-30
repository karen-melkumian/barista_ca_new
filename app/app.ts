import 'reflect-metadata';
import { container } from './adapters/container/container';
import { server } from './adapters/expresscases/server';

async function runApp() {
    const app = await server(container);
    return app;
}

(async () => {
    await runApp();
})();

export { runApp };
