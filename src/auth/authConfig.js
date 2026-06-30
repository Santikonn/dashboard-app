// authConfig.js

export const msalConfig = {
  auth: {
    clientId: "aac3ae97-0ddc-41c4-853a-98db72436f1b",
    authority:
      "https://login.microsoftonline.com/d71bd5aa-2687-43f0-b875-b322ea520382",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
  },
};