var clientPort = 9002,
    webApiPort = 3002;

var webApiApp = require('./hosts/webapi'),
    clientHostApp = require('./hosts/clientHost');

webApiApp.listen(webApiPort);
clientHostApp.listen(clientPort);
