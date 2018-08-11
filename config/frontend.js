module.exports = {
  development: {
      password_reset_link: 'http://localhost:3000/password-reset/',
      info_link: 'http://localhost:3000/'
  },
  test: {
      password_reset_link: 'https://apps.cs.au.dk/sodaclub/password-reset/',
      info_link: 'https://apps.cs.au.dk/sodaclub'
  },
  production: {
      password_reset_link: 'https://apps.cs.au.dk/sodaclub/password-reset/',
      info_link: 'https://apps.cs.au.dk/sodaclub'
  }
};
