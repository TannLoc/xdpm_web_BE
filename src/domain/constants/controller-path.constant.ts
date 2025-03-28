export enum GENERIC_PATH {
  MANAGEMENT = 'management',
}

export enum USER_ROUTERS {
  CONTROLLER = 'user',
  FIND = '',
  FIND_CUSTOMER = 'customer',
  UPDATE = '',
}

export enum SHIPMENT_ROUTERS {
  CONTROLLER = 'shipment',
  CREATE = '',
  FIND = '',
  UPDATE = ':id',
  FIND_ONE = ':id',
  DELETE = ':id',
}
export enum PRODUCTS_ROUTERS {
  CONTROLLER = 'product',
  CREATE = '',
  FIND = '',
  UPDATE = ':id',
  FIND_ONE = ':id',
  DELETE = ':id',
  SET_ACTIVE = ':id/set-active',
}

export enum PICKLIST_ROUTERS {
  CONTROLLER = 'picklist',
  CREATE = '',
  FIND = '',
}

export enum ORDERS_ROUTERS {
  CONTROLLER = 'order',
  CREATE = '',
  FIND = '',
  UPDATE = ':id',
  FIND_ONE = ':id',
  ACTION = ':id/action',
}

export enum CARTS_ROUTERS {
  CONTROLLER = 'cart',
  CREATE = '',
  FIND = '',
  UPDATE = ':id',
  DELETE = ':id',
}

export enum BRANDS_ROUTERS {
  CONTROLLER = 'brand',
  CREATE = '',
  FIND = '',
  UPDATE = ':id',
  FIND_ONE = ':id',
  DELETE = ':id',
}

export enum AUTH_ROUTERS {
  CONTROLLER = 'auth',
  LOGIN = 'login',
  REGISTER = 'register',
  REFRESH_TOKEN = 'refresh-token',
  LOGOUT = 'logout',
}

export enum UPLOADS_ROUTERS {
  CONTROLLER = 'upload',
  CREATE = '',
}
