export const environment = {
GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] || 'google-client-id-default',
GOOGLE_SECRET_ID: process.env['GOOGLE_SECRET_ID'],
BACKEND_URL: process.env['BACKEND_URL'],

keycloak: {
    realm: process.env['KEYCLOAK_REALM'] ,
    clientId: process.env['KEYCLOAK_CLIENT_ID'],
    url: process.env['KEYCLOAK_URL'],
},
};