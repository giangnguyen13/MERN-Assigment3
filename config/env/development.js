//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
    //db: 'mongodb://localhost/courses-db',

    db: 'mongodb://localhost/articles-db',
    sessionSecret: 'developmentSessionSecret',
    secretKey: 'real_secret',
};
