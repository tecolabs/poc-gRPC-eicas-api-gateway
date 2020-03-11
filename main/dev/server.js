var express = require('express');
var proxyHttp = require('express-http-proxy');
var verifyService = require('./services/verifyService');
var cors = require('cors');
var app = express();


app.use(cors());

//AGENTES
app.use('/infrastructures', proxyHttp(process.env.URL_AGENTES, {
    proxyReqPathResolver: (req) => updateURL(req, 'infrastructures'),
    filter: filter
}));
app.use('/states', proxyHttp(process.env.URL_AGENTES, {
    proxyReqPathResolver: (req) => updateURL(req, 'states'),
    filter: filter
}));

//SENSORES
app.use('/temperatures', proxyHttp(process.env.URL_SENSORES, {
    proxyReqPathResolver: (req) => updateURL(req, 'temperatures'),
    filter: filter
}));
app.use('/pressure', proxyHttp(process.env.URL_SENSORES, {
    proxyReqPathResolver: (req) => updateURL(req, 'pressure'),
    filter: filter
}));
app.use('/elevation', proxyHttp(process.env.URL_SENSORES, {
    proxyReqPathResolver: (req) => updateURL(req, 'elevation'),
    filter: filter
}));
app.use('/humidity', proxyHttp(process.env.URL_SENSORES, {
    proxyReqPathResolver: (req) => updateURL(req, 'humidity'),
    filter: filter
}));

app.use('/flow', proxyHttp(process.env.URL_SENSORES, {
    proxyReqPathResolver: (req) => updateURL(req, 'flow'),
    filter: filter
}));

//PROCESOS
app.use('/reloads', proxyHttp(process.env.URL_PROCESOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'reloads'),
    filter: filter
}));
app.use('/activation', proxyHttp(process.env.URL_PROCESOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'activation'),
    filter: filter
}));
app.use('/mcss', proxyHttp(process.env.URL_PROCESOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'mcss'),
    filter: filter
}));
app.use('/news', proxyHttp(process.env.URL_PROCESOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'news'),
    filter: filter
}));
app.use('/digitization', proxyHttp(process.env.URL_PROCESOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'digitization'),
    filter: filter
}));
app.use('/portability', proxyHttp(process.env.URL_PROCESOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'portability'),
    filter: filter
}));
app.use('/baf', proxyHttp(process.env.URL_PROCESOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'baf'),
    filter: filter
}));

//EVENTOS Y REPORTES
app.use('/exportsEvents', proxyHttp(process.env.URL_EVENTOS_REPORTES, {
    proxyReqPathResolver: (req) => updateURL(req, 'exportsEvents'),
    filter: filter
}));
app.use('/exportReports', proxyHttp(process.env.URL_EVENTOS_REPORTES, {
    proxyReqPathResolver: (req) => updateURL(req, 'exportReports'),
    filter: filter
}));
app.use('/events', proxyHttp(process.env.URL_EVENTOS_REPORTES, {
    proxyReqPathResolver: (req) => updateURL(req, 'events'),
    filter: filter
}));

//proyectos
app.use('/projects', proxyHttp(process.env.URL_PROYECTOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'projects'),
    filter: filter
}));


//SOPORTE
// para los permisos y el uso del microservicio de verificacion hay que usar express-http-proxy
app.use('/users', proxyHttp(process.env.URL_SOPORTE, {
    proxyReqPathResolver: (req) => updateURL(req, 'users'),
    filter: filter
}));

app.use('/roles', proxyHttp(process.env.URL_SOPORTE, {
    proxyReqPathResolver: (req) => updateURL(req, 'roles'),
    filter: filter
}));
app.use('/resources', proxyHttp(process.env.URL_SOPORTE, {
    proxyReqPathResolver: (req) => updateURL(req, 'resources')
}));
app.use('/ranges', proxyHttp(process.env.URL_SOPORTE, {
    proxyReqPathResolver: (req) => updateURL(req, 'ranges'),
    filter: filter
}));
app.use('/alerts', proxyHttp(process.env.URL_SOPORTE, {
    proxyReqPathResolver: (req) => updateURL(req, 'alerts'),
    filter: filter
}));
app.use('/tokens', proxyHttp(process.env.URL_SOPORTE, {
    proxyReqPathResolver: (req) => updateURL(req, 'tokens'),
    filter: filter
}));
app.use('/audit', proxyHttp(process.env.URL_SOPORTE, {
    proxyReqPathResolver: (req) => updateURL(req, 'audit'),
    filter: filter
}));


//home
app.use('/home', proxyHttp(process.env.URL_HOME, {
    proxyReqPathResolver: (req) => updateURL(req, 'home'),
}));

//servicios
app.use('/services', proxyHttp(process.env.URL_SERVICIOS, {
    proxyReqPathResolver: (req) => updateURL(req, 'services'),
}));

//login
app.use('/authentication', proxyHttp(process.env.URL_SOPORTE, {
    proxyReqPathResolver: (req) => updateURL(req, 'authentication')
}));


function updateURL(req, base) {
    if (req.url === '/') {
        return req.url + base;
    } else {
        return '/' + base + req.url;
    }
}

function filter(req, res) {
    return new Promise(async function (resolve) {
        const resAuthorization = await verifyService.verifyPermissions(req);
        var isAuthorized = resAuthorization.autorizationResponse;
        if (isAuthorized) {
            resolve(true);
        } else {
            resolve(res.status(+resAuthorization.errorStatus).json({
                message: resAuthorization.errorMessage
            }));
        }
    })
}

app.listen(3100);
