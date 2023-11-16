import { ILogin } from "@/common/form-schemas";
import { api } from "./api";

class AuthServiceApi {
  login = async (params: ILogin) => {
    return api.post("/login", { ...params });
  };
}

export const authServiceApi = new AuthServiceApi();
