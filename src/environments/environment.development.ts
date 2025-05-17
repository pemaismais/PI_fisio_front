export const environment = {
GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] || 'google-client-id-default',
GOOGLE_SECRET_ID: process.env['GOOGLE_SECRET_ID'],
BACKEND_URL: process.env['BACKEND_URL'],

KEYCLOAK_URL: 'http://localhost:8080',
KEYCLOAK_REALM: 'pi_fisio',
KEYCLOAK_CLIENT_ID: 'frontend_app'
};