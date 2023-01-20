export const API = {
  authentication: {
    oauth: 'v1/authentication/oauth',
    logout: 'v1/authentication/logout',
    me: 'v1/authentication/me',
    refreshToken: 'v1/authentication/refreshToken'
  },
  users: {
    oauth: 'v1/users'
  },
  adapter: {
    all: 'v1/adapters',
    update: 'v1/adapter'
  },
  instance: {
    all: 'v1/instances',
    get: 'v1/instance',
    update: 'v1/instance',
    delete: 'v1/instance'
  }
}
