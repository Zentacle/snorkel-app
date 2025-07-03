interface User {
  display_name?: string;
  email: string;
  username: string;
  profile_pic?: string;
  password: string;
  first_name?: string;
  last_name?: string;
  id: number;
  admin?: boolean;
}

export const users: User[] = [
  {
    display_name: 'Cayley Larimer',
    email: 'cayley.larimer@gmail.com',
    username: 'cayleyal',
    // profile_pic:
      // 'https://scontent.fhnl3-2.fna.fbcdn.net/v/t1.6435-9/155502241_10157953244046918_654448155820156789_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=qoMB9WkAqiEAX-ad1l8&_nc_ht=scontent.fhnl3-2.fna&oh=1652e85c76302bdb9afe9f1c94ed4bcb&oe=60ED2C76',
    password: 'password',
    id: 5,
  },
  {
    id: 1,
    first_name: 'Mayank',
    last_name: 'Jain',
    email: 'mjmayank@gmail.com',
    password: 'password',
    username: 'mjmayank',
    admin: true,
  },
];
