
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.13.0
 * Query Engine version: b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b
 */
Prisma.prismaVersion = {
  client: "5.13.0",
  engine: "b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Auth_groupScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.Auth_group_permissionsScalarFieldEnum = {
  id: 'id',
  group_id: 'group_id',
  permission_id: 'permission_id'
};

exports.Prisma.Auth_permissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  content_type_id: 'content_type_id',
  codename: 'codename'
};

exports.Prisma.Auth_userScalarFieldEnum = {
  id: 'id',
  password: 'password',
  last_login: 'last_login',
  is_superuser: 'is_superuser',
  username: 'username',
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  is_staff: 'is_staff',
  is_active: 'is_active',
  date_joined: 'date_joined'
};

exports.Prisma.Auth_user_groupsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  group_id: 'group_id'
};

exports.Prisma.Auth_user_user_permissionsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  permission_id: 'permission_id'
};

exports.Prisma.Cart_cartScalarFieldEnum = {
  id: 'id',
  cart_id: 'cart_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  user_id: 'user_id'
};

exports.Prisma.Cart_cartitemScalarFieldEnum = {
  id: 'id',
  cart_item_id: 'cart_item_id',
  quantity: 'quantity',
  cart_id: 'cart_id',
  product_id: 'product_id'
};

exports.Prisma.Categories_categoryScalarFieldEnum = {
  id: 'id',
  cat_id: 'cat_id',
  cat_title: 'cat_title',
  cat_image_file: 'cat_image_file',
  cat_image_url: 'cat_image_url'
};

exports.Prisma.Django_admin_logScalarFieldEnum = {
  id: 'id',
  action_time: 'action_time',
  object_id: 'object_id',
  object_repr: 'object_repr',
  action_flag: 'action_flag',
  change_message: 'change_message',
  content_type_id: 'content_type_id',
  user_id: 'user_id'
};

exports.Prisma.Django_content_typeScalarFieldEnum = {
  id: 'id',
  app_label: 'app_label',
  model: 'model'
};

exports.Prisma.Django_migrationsScalarFieldEnum = {
  id: 'id',
  app: 'app',
  name: 'name',
  applied: 'applied'
};

exports.Prisma.Django_sessionScalarFieldEnum = {
  session_key: 'session_key',
  session_data: 'session_data',
  expire_date: 'expire_date'
};

exports.Prisma.Main_useraddressScalarFieldEnum = {
  id: 'id',
  address_type: 'address_type',
  address_line1: 'address_line1',
  address_line2: 'address_line2',
  city: 'city',
  state: 'state',
  country: 'country',
  postal_code: 'postal_code',
  user_profile_id: 'user_profile_id'
};

exports.Prisma.Main_userprofileScalarFieldEnum = {
  id: 'id',
  user_pfp: 'user_pfp',
  user_gender: 'user_gender',
  user_id: 'user_id',
  user_pfp_url: 'user_pfp_url',
  user_phone: 'user_phone'
};

exports.Prisma.Order_orderScalarFieldEnum = {
  id: 'id',
  order_id: 'order_id',
  total_amount: 'total_amount',
  created_at: 'created_at',
  user_id: 'user_id',
  updated_at: 'updated_at',
  is_paid: 'is_paid',
  payment_date: 'payment_date',
  payment_status: 'payment_status',
  transaction_id: 'transaction_id',
  shipping_address_id: 'shipping_address_id',
  delivery_status: 'delivery_status'
};

exports.Prisma.Order_orderitemScalarFieldEnum = {
  id: 'id',
  quantity: 'quantity',
  order_id: 'order_id',
  product_id: 'product_id'
};

exports.Prisma.Products_productScalarFieldEnum = {
  id: 'id',
  prod_id: 'prod_id',
  prod_title: 'prod_title',
  prod_image_file: 'prod_image_file',
  prod_image_url: 'prod_image_url',
  prod_desc: 'prod_desc',
  prod_price: 'prod_price',
  prod_old_price: 'prod_old_price',
  prod_specs: 'prod_specs',
  prod_instock: 'prod_instock',
  prod_date_added: 'prod_date_added',
  prod_date_updated: 'prod_date_updated',
  category_id: 'category_id',
  is_featured: 'is_featured'
};

exports.Prisma.Products_wishlistScalarFieldEnum = {
  user_id: 'user_id'
};

exports.Prisma.Products_wishlist_productsScalarFieldEnum = {
  id: 'id',
  wishlist_id: 'wishlist_id',
  product_id: 'product_id'
};

exports.Prisma.WishlistScalarFieldEnum = {
  id: 'id',
  userId: 'userId'
};

exports.Prisma.WishlistItemScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  wishlistId: 'wishlistId',
  createdAt: 'createdAt'
};

exports.Prisma.StripeCustomerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  stripeCustomerId: 'stripeCustomerId',
  createdAt: 'createdAt',
  updateddAt: 'updateddAt'
};

exports.Prisma.UserFeedbacksScalarFieldEnum = {
  id: 'id',
  message: 'message',
  userId: 'userId',
  isFeatured: 'isFeatured',
  createdAt: 'createdAt',
  updateddAt: 'updateddAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  auth_group: 'auth_group',
  auth_group_permissions: 'auth_group_permissions',
  auth_permission: 'auth_permission',
  auth_user: 'auth_user',
  auth_user_groups: 'auth_user_groups',
  auth_user_user_permissions: 'auth_user_user_permissions',
  cart_cart: 'cart_cart',
  cart_cartitem: 'cart_cartitem',
  categories_category: 'categories_category',
  django_admin_log: 'django_admin_log',
  django_content_type: 'django_content_type',
  django_migrations: 'django_migrations',
  django_session: 'django_session',
  main_useraddress: 'main_useraddress',
  main_userprofile: 'main_userprofile',
  order_order: 'order_order',
  order_orderitem: 'order_orderitem',
  products_product: 'products_product',
  products_wishlist: 'products_wishlist',
  products_wishlist_products: 'products_wishlist_products',
  Wishlist: 'Wishlist',
  WishlistItem: 'WishlistItem',
  StripeCustomer: 'StripeCustomer',
  UserFeedbacks: 'UserFeedbacks'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
