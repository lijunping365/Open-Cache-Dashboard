import React from 'react';
import { Form, Button, Input, Modal } from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.OpenCacheValue>) => void;
  onSubmit: (values: Partial<API.OpenCacheValue>) => void;
  updateModalVisible: boolean;
  values: Partial<API.OpenCacheValue>;
}
const FormItem = Form.Item;
const { TextArea } = Input;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...values, ...fieldsValue});
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="缓存编辑"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          cacheKey: values.cacheKey,
          cacheValue: values.cacheValue
        }}
      >
        <FormItem
          name="cacheKey"
          label="缓存 key"
          rules={[{ required: true, message: '请输入缓存key！'}]}
        >
          <Input placeholder="请输入缓存key" />
        </FormItem>

        <FormItem
          name="cacheValue"
          label="缓存 value"
          rules={[{ required: true, message: '请输入缓存value！' }]}
        >
          <TextArea rows={4}  placeholder="请输入缓存值（json 格式）" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
