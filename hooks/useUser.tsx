import { useQuery } from "@tanstack/react-query";
import { userServiceApi } from "@/services/user-service";

const { getUserInfo } = userServiceApi;

import { create } from "zustand";

interface UserStoreParams {
  user: any | null;
  setUser: (user: any | null) => void;
}

const useUserStore = create<UserStoreParams>((set: any) => ({
  user: null,
  setUser: (data: any) =>
    set((state: any) => {
      return { ...state, user: data };
    }),
}));

const useUser = () => {
  const { setUser } = useUserStore();
  const { data, isSuccess } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
  });
  if (isSuccess) {
    setUser(data)
  }
  return data;
};

export { useUser, useUserStore };
