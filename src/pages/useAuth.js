import { useState } from 'react';

const useAuth = () => {
  const [auth] = useState(true);

  return auth;
};

export default useAuth;
