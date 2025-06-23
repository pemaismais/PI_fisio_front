export const environment = {
    production: false,
    BACKEND_URL: 'http://localhost:8081',
    
    keycloak: {
      url: 'http://localhost:7080', 
      realm: 'main_realm',
      clientId: 'led',
  },
  };
   
// export const environment = {
//   production: false,
//   BACKEND_URL: 'https://haproxy.fisio.com/pi_fisio',

//   keycloak: {
//     url: 'https://backend.fisio.com:7443',
//     realm: 'main_realm',
//     clientId: 'led',
//   },
// };
