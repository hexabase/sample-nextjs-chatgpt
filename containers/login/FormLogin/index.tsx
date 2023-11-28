import React, { useEffect, useMemo } from "react";
import { loginSchema } from "@/common/form-schemas";
import ButtonComponent from "../../../components/atoms/buttons";
import FormItem from "@/components/atoms/form-items/FormItem";
import { PasswordInput } from "@/components/atoms/inputs/PasswordInput";
import TextInput from "@/components/atoms/inputs/TextInput";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import { COOKIES_KEY } from "@/common/constants/cookie";
import { HexabaseClient, Item } from "@hexabase/hexabase-js";
import { useHexabase, useHexabaseStore } from "@/hooks/useHexabase";

const FormLogin: React.FC = () => {
  const { setClientHxb } = useHexabaseStore();
  const {
    loginMutation: { mutate },
  } = useAuth();

  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSuccess = (res: any) => {
    if (res?.token) {
      Cookies.set(COOKIES_KEY.ACCESS_TOKEN, res?.token);
      router.push(APP_ROUTES.HOME);
    }
  };

  const onError = (error: any) => {
    toast.error(error?.data?.message || "Sever error");
  };

  const onSubmit = async (values: any) => {
    let client = await useHexabase(values?.email, values?.password);
    if (client) {
      console.log(client);
      setClientHxb(client);
      Cookies.set(COOKIES_KEY.ACCESS_TOKEN, client.tokenHxb);
      router.push(APP_ROUTES.HOME);
    }
  };

  const getPrefecturesItems = async (client: HexabaseClient): Promise<Item[]> => {
    const workspace = await client.workspace("6548aec4fda94524d403ce4f");
    const project = await workspace.project("65582087baeaf8d6328c49b9");
    const datastore = await project.datastore("6558260e245accaeb79d5fa0");
    const items = await datastore.items({
      page: 1,
      per_page: 10,
      use_display_id: true,
    });
    return items;
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <FormItem name="email" containerClassName="mb-6">
            <TextInput placeholder="メールアドレス" />
          </FormItem>
          <FormItem name="password" containerClassName="mb-6">
            <PasswordInput placeholder="パスワード" />
          </FormItem>
          <div className="text-center">
            <ButtonComponent
              variant="out-line"
              text="ログイン"
              // disabled={isLoading}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormLogin;
