import { useEffect } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeStorageData, setStorageData } from "../config/storage";
import { login, logout, setAuth } from "@app/core/Redux/feat/auth/authSlice";
import { loginApi, registerApi } from "@app/core/services";
import { ACCESS_TOKEN, ROUTES, USER_PROFILE } from "@app/core/types/constants";
import type {
  RegisterPayload,
  LoginPayload,
  User,
} from "@app/core/types/interfaces";

export const USER_QUERY_KEY = {
  PROFILE: ["user-profile"],
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (registerUserDto: RegisterPayload) => {
      const response = await registerApi(registerUserDto);
      return response?.data;
    },

    onSuccess: (data) => {
      navigate('/login');
    },

    onError: (error: any) => {
    },
  });
};



export const useLogin = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();

  return useMutation({
  mutationFn: async (payload: LoginPayload) => {
    const { data } = await loginApi(payload);
    return data;
  },
  onSuccess: ({ data }) => {
    dispatchAuth(login());
    dispatchAuth(
      setAuth({
        user: { name: data?.user.username },
        permissions: [],
      }),
    );

    setStorageData(ACCESS_TOKEN, data?.token);
    setStorageData(USER_PROFILE, data.user);

    navigate('/');
  },
  onError: (error: any) => {
    console.log(error?.response?.data?.message);
  },
});

};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();

  const handleLogout = () => {
    removeStorageData(ACCESS_TOKEN);
    removeStorageData(USER_PROFILE);

    dispatchAuth(logout());

    navigate(ROUTES.LOGIN, { replace: true });
  };

  return { handleLogout };
};


export const useGetProfile = (isAuth = true) => {
  const dispatch = useDispatch();

  const query = useQuery<User>({
    queryKey: USER_QUERY_KEY.PROFILE,
    queryFn: async () => {
      const { data } = await getProfileApi();
      return data.data;
    },
    enabled: isAuth,
  });

  // 👉 handle side-effect ở đây
  useEffect(() => {
    if (query.data) {
      dispatch(
        setAuth({
          user: query.data,
          permissions: [],
        }),
      );
    }
  }, [query.data, dispatch]);

  return query;
};
