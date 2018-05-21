module.exports = {
  development: {
    from: 'svendcsvendsen@gmail.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'svendcsvendsen@gmail.com',
        pass: 'password'
    }
  },
  test: {
      // TODO
  },
  production: {
      // TODO
  }
};
