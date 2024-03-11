const http = require('http');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('content-type', 'text/html')
        res.write('<head><title>Home Page</title></head>');
        res.write('<html><body>');
        res.write('<h1>Welcome to the Home Page</h1>');
        res.write('<h2>Create a User</h2>');
        res.write('<form method="POST" action="/create-user"><input name="username" /><button>Submit</button></form>');
        res.write('</body></html>');
        return res.end();
    }
    else if(url === '/users'){
        res.setHeader('content-type', 'text/html')
        res.write('<head><title>Users</title></head>');
        res.write('<html><body>');
        res.write('<h1>Users</h1>');
        res.write('<ul>');
        res.write('<li>User 1</li>');
        res.write('<li>User 2</li>');
        res.write('<li>User 3</li>');
        res.write('</ul>');
        res.write('</body></html>');
        return res.end();
    }
    else if(url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            console.log(user);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
});
server.listen(3000);