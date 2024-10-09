export interface UserCnt {
  _id: string;
  count: number;
}

export interface UsersData {
  activeUsers: UserCnt[];
  newUsers: UserCnt[];
  //   totalUsers: UserCnt[];
}

export interface CombinedUserData {
  _id: string;
  newUsersCount: number;
  activeUsersCount: number;
}

export interface OrderStat {
  _id: string;
  totalOrderCount: number;
  totalRevenue: number;
}

export interface ProductStat {
  category: string;
  productsInStock: number;
  productCount: number;
}

export interface CompleteStatsData {
  message: string;
  userData: UsersData[];
  ordersData: OrderStat[];
  productsData: ProductStat[];
}

export const userData: UsersData = {
  activeUsers: [
    {
      _id: "02-10-2024",
      count: 0,
    },
    {
      _id: "03-10-2024",
      count: 20,
    },
    {
      _id: "04-10-2024",
      count: 2,
    },
    {
      _id: "05-10-2024",
      count: 0,
    },
    {
      _id: "06-10-2024",
      count: 0,
    },
    {
      _id: "07-10-2024",
      count: 1,
    },
    {
      _id: "08-10-2024",
      count: 0,
    },
    {
      _id: "09-10-2024",
      count: 0,
    },
  ],
  newUsers: [
    {
      _id: "02-10-2024",
      count: 2,
    },
    {
      _id: "03-10-2024",
      count: 0,
    },
    {
      _id: "04-10-2024",
      count: 1,
    },
    {
      _id: "05-10-2024",
      count: 0,
    },
    {
      _id: "06-10-2024",
      count: 0,
    },
    {
      _id: "07-10-2024",
      count: 15,
    },
    {
      _id: "08-10-2024",
      count: 20,
    },
    {
      _id: "09-10-2024",
      count: 0,
    },
  ],
};
//   totalUsers: [
//     {
//       _id: null,
//       count: 11,
//     },
//   ],

export const productsData = [
  {
    category: "Necklaces",
    productsInStock: 6,
    productCount: 4,
  },
  {
    category: "Earrings",
    productsInStock: 3,
    productCount: 4,
  },
  {
    category: "Bracelets",
    productsInStock: 12,
    productCount: 4,
  },
];

export const ordersData: OrderStat[] = [
  {
    _id: "02-10-2024",
    totalOrderCount: 4,
    totalRevenue: 6000,
  },
  {
    _id: "03-10-2024",
    totalOrderCount: 0,
    totalRevenue: 0,
  },
  {
    _id: "04-10-2024",
    totalOrderCount: 2,
    totalRevenue: 4300,
  },
  {
    _id: "05-10-2024",
    totalOrderCount: 0,
    totalRevenue: 0,
  },
  {
    _id: "06-10-2024",
    totalOrderCount: 0,
    totalRevenue: 0,
  },
  {
    _id: "07-10-2024",
    totalOrderCount: 0,
    totalRevenue: 0,
  },
  {
    _id: "08-10-2024",
    totalOrderCount: 0,
    totalRevenue: 0,
  },
  {
    _id: "09-10-2024",
    totalOrderCount: 0,
    totalRevenue: 0,
  },
];
