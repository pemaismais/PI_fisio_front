export const environment = {
  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] || 'google-client-id-default',
  GOOGLE_SECRET_ID: process.env['GOOGLE_SECRET_ID'],
  BACKEND_URL: process.env['BACKEND_URL'] ,
  production: false,

  keycloak: {
    realm: process.env['KEYCLOAK_REALM'] || 'default-realm',
    clientId: process.env['KEYCLOAK_CLIENT_ID'] || 'default',
    url: process.env['KEYCLOAK_URL'] || 'http://localhost:7080',
},
};