export const environment = {
  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] || 'google-client-id-default',
  GOOGLE_SECRET_ID: process.env['GOOGLE_SECRET_ID'],
  BACKEND_URL: process.env['BACKEND_URL'] ,
  production: false,
  DATABASE_USER: "backend",
  DATABASE_PASSWORD: "backend",
  JWT_SECRET: "0b5885bb27088d56ec27c94df005f40802336f2f9ada4e8877aac92899204e7c04051509e6a3afdf45969a403e9042242e6fb7830a0eebc0e744fe1c03864b33e4eb39ed9af5afb42891548f9f305d3a9b1bf710d2c968ae3ff9a626811696fc9e827c223c0d48b217376d89237c46b13d03df766f17f99a53f4eba630ad04fe346717b077e017ac8baabdf56ce046cba9b4e2",
  JWT_REFRESH_TOKEN_EXPIRATION: 48,
  JWT_TOKEN_EXPIRATION: 1000,
  // FRONTEND_URL: 'https://front.fisio.com',
  MYSQL_URL: 'database.fisio.lan',

  KEYCLOAK_URL: 'http://localhost:8080',
  KEYCLOAK_REALM: 'pi_fisio',
  KEYCLOAK_CLIENT_ID: 'frontend_app'
};