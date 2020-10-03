const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    const proxy = createProxyMiddleware({
        target: 'http://jsonplaceholder.typicode.com/posts',
        changeOrigin: true,
    })

    server.use('/api/posts', proxy);
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});