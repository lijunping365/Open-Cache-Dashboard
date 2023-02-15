import React from 'react';
import {Button, Form, Input, Modal} from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: Partial<API.OpenCacheValue>) => void;
}

const FormItem = Form.Item;
const { TextArea } = Input;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  /** 新建窗口的弹窗 */
  const [form] = Form.useForm();

  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;

  const handleFinish = async () => {
    const fieldsValue: any = await form.validateFields();
    handleCreate({
      ...fieldsValue,
    });
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleCreateModalVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleFinish()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="新建缓存"
      width={600}
      visible={modalVisible}
      footer={renderFooter()}
      onCancel={() => handleCreateModalVisible(false)}
      onOk={() => handleFinish()}
    >
      <Form
        {...formLayout}
        form={form}
      >
        <FormItem
          name="cacheKey"
          label="缓存 key"
          rules={[{ required: true, message: '请输入缓存键！' }]}
        >
          <Input placeholder="请输入缓存键" />
        </FormItem>
        <FormItem
          name="cacheValue"
          label="缓存 value"
          rules={[{ required: true, message: '请输入缓存值！' }]}
        >
          <TextArea rows={4}  placeholder="请输入缓存值（json 格式）" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
