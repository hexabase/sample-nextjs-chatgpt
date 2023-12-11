import { COOKIES_KEY } from '@/common/constants/cookie';
import { APP_ROUTES } from '@/common/constants/routes';
import { loginSchema } from '@/common/form-schemas';
import FormItem from '@/components/atoms/form-items/FormItem';
import { PasswordInput } from '@/components/atoms/inputs/PasswordInput';
import TextInput from '@/components/atoms/inputs/TextInput';
import useAuth from '@/hooks/useAuth';
import { useHexabase, useHexabaseStore } from '@/hooks/useHexabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ButtonComponent from '@/components/atoms/buttons';

const FormLogin: React.FC = () => {
  const { setClientHxb } = useHexabaseStore();
  const {
    loginMutation: { mutate },
  } = useAuth();

  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
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
    toast.error(error?.data?.message || 'Sever error');
  };

  const onSubmit = async (values: any) => {
    const client = await useHexabase(values?.email, values?.password);
    if (client) {
      setClientHxb(client);
      Cookies.set(COOKIES_KEY.ACCESS_TOKEN, client.tokenHxb);
      Cookies.set(COOKIES_KEY.USERNAME, client?.currentUser?.userName ?? '');
      Cookies.set(COOKIES_KEY.EMAIL, client?.currentUser?.email ?? '');
      Cookies.set(COOKIES_KEY.USER_ID, client?.currentUser?.id ?? '');
      Cookies.set(
        COOKIES_KEY.PROFILE_PICTURE,
        client?.currentUser?.profilePicture ?? ''
      );
      router.push(APP_ROUTES.HOME);
    }
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
