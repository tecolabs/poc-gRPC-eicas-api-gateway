var PROTO_PATH = './protos/verify.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var verify_proto = grpc.loadPackageDefinition(packageDefinition).verify;

exports.verifyPermissions = async function (req, res) {
    var resAuthorization = null;
    try {
        resAuthorization = await getAuthorization(req);
        return resAuthorization;
    } catch (e) {
        console.error(e);
    }
};

getAuthorization = (req) => {
    var client = new verify_proto.VerifyPermissions(process.env.IP_HOST + ':50051',
        grpc.credentials.createInsecure());
    var token = req.headers['x-access-token'];

    return new Promise((resolve, reject) => {
        client.autorization({
                token: token,
                refreshToken: '',
                method: req.method,
                baseUrl: req.baseUrl,
            },
            (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response);
            });
    });
};
