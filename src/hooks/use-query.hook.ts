import { useMemo } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

type Params = {[key: string]: string | number};

const useQuery = () => {
  const { search, pathname, state } = useLocation();
  const navigate = useNavigate();

  const params = useMemo(() => {
    const params = new URLSearchParams(search);
    return Object.fromEntries(params);
  }, [search]);

  const setParams = (newParams: Params) => {
    const paramsObject: Params = { ...params, ...newParams };

    const paramsArray = Object.entries(newParams).map(([name, value]) => {
      paramsObject[name] = JSON.stringify(value);
      return `${name}=${JSON.stringify(value)}`;
    })
    navigate(`${pathname}?${paramsArray.join('&')}`);
  };

  return {
    params,
    setParams,
  }
};

export default useQuery;
