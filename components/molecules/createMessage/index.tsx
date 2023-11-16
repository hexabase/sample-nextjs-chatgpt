import IconSend from '@/components/atoms/icons/IconSend';
import { Button, Form, Input } from 'antd';
import React from 'react';
interface Props {
  onSubmit?: (message: string) => void;
}
function CreateMessage(props: Props) {
  const { onSubmit } = props;
  const [form] = Form.useForm();

  const handleFinish = (value: { input: string }) => {
    console.log(value);
    if (value.input) {
      onSubmit?.(value.input);
    }
    form.resetFields();
  };
  return (
    <Form form={form} onFinish={handleFinish}>
      <div className="flex items-center justify-between gap-4 lg:max-w-2xl lg:mx-auto my-5">
        <Form.Item className="flex-1 !mb-0" name="input">
          <Input.TextArea
            autoSize={{ minRows: 1 }}
            size="large"
            placeholder="message"
          />
        </Form.Item>
        <Button
          size="large"
          htmlType="submit"
          className="!px-5 hover:!text-[#000] hover:!border-[#00000040]"
        >
          <IconSend />
        </Button>
      </div>
    </Form>
  );
}

export default CreateMessage;
