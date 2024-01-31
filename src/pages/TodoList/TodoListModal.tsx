import { useEffect, useMemo } from 'react';
import { Form, Input, Modal, Select, DatePicker, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { actAddTodo, actEditTodo } from '../../redux/reducers/todo';
import { PRIORITY, STATUS } from 'src/constants/consts';

interface TodoListModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TodoListModal = (props: TodoListModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { isOpen, onCloseModal } = props;

  const todoAppState = useSelector((state: any) => state.TodoApp);
  const { selectedTodo } = todoAppState;

  const isAddTodo = useMemo(() => {
    return todoAppState?.selectedTodo ? false : true;
  }, [selectedTodo]);

  useEffect(() => {
    // set field value when edit todo
    if (!isAddTodo) {
      form.setFieldsValue({
        title: selectedTodo.title,
        description: selectedTodo.description,
        status: selectedTodo.status,
        priority: selectedTodo.priority,
      });
    } else {
      form.resetFields();
    }
  }, [isAddTodo, isOpen]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo: any) => {
    console.log('onFinishFailed()', errorInfo);
  };

  const handleOk = () => {
    const id = uuidv4();
    const formValues = form.getFieldsValue();

    if (isAddTodo) {
      dispatch(actAddTodo({ ...formValues, id }));
      onShowAddEditNotificationSuccess();
    } else {
      dispatch(actEditTodo({ ...formValues, id: selectedTodo?.id }));
      onShowAddEditNotificationSuccess();
    }
    onCloseModal();
  };

  const onShowAddEditNotificationSuccess = () => {
    messageApi.open({
      type: 'success',
      content: isAddTodo ? 'Add success' : 'Update success',
    });
  };

  return (
    <Modal
      title={isAddTodo ? 'Add Todo' : 'Update Todo'}
      open={isOpen}
      className='custom'
      width={700}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={onCloseModal}
    >
      {contextHolder}
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        onFinish={handleOk}
        onFinishFailed={onFinishFailed}
        form={form}
        layout='vertical'
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[{ required: true, message: 'Please input title' }]}
        >
          <Input placeholder='Enter title' />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input description' }]}
        >
          <TextArea placeholder='Enter your description' />
        </Form.Item>

        <Form.Item
          name='status'
          label='Status'
          rules={[{ required: true, message: 'Please input title' }]}
          initialValue={STATUS.TODO}
        >
          <Select
            style={{ width: 120 }}
            options={[
              { value: STATUS.TODO, label: STATUS.TODO },
              { value: STATUS.HOLD, label: STATUS.HOLD },
              { value: STATUS.DONE, label: STATUS.DONE },
            ]}
          />
        </Form.Item>

        <Form.Item
          name='dueDate'
          label='Date'
          rules={[{ required: true, message: 'Please input date' }]}
        >
          <RangePicker />
        </Form.Item>

        <Form.Item
          name='priority'
          label='Priority'
          rules={[{ required: true, message: 'Please input title' }]}
          initialValue={PRIORITY.HIGH}
        >
          <Select
            style={{ width: 120 }}
            options={[
              { value: PRIORITY.HIGH, label: PRIORITY.HIGH },
              { value: PRIORITY.MEDIUM, label: PRIORITY.MEDIUM },
              { value: PRIORITY.LOW, label: PRIORITY.LOW },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button className='m-5'>Cancel</Button>

          <Button type='primary' htmlType='submit'>
            {isAddTodo ? 'Add' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoListModal;
