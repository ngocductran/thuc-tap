import React, { useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, InputNumber, Breadcrumb } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Console } from 'console';
const { confirm } = Modal;


const App: React.FC = () => {

const [isModalVisible, setIsModalVisible] = useState(false);

const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};
const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

interface DataType {
  key: string;
  name: string;
  content: string;
  start_time: string;
	end_time: string;
	progress: number;
	status: string;
  team: Team;
}

interface Team {
  id: string;
  name: string;
  leader: string;
  member: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Bắt đầu',
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: 'Kết thúc',
    dataIndex: 'end_time',
    key: 'end_time',
  },
  {
    title: 'Tiến độ',
    dataIndex: 'progress',
    key: 'progress',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Team',
    dataIndex: 'team',
    render: (_, { team }) => (
      team.name
  ), 
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href='#'><Button onClick={showModal} type="primary">Edit</Button></a>
        <a href='#'><Button onClick={showDeleteConfirm}>Delete</Button></a>
      </Space>
    ),
  },
];


const data: DataType[] = [
  {
    "key" : '47547',
    "name" : "CRUD",
    "content" : "Thêm sửa xóa",
    "start_time" : "31-12-2021",
    "end_time" : "31-12-2021",
    "progress" : 90,
    "status" : "On",
    "team" : {
      "id" : '54353',
      "name" : "fixbugs2",
      "leader" : "Tuần",
      "member" : ["Vĩnh", "Tình", "Đức"]
    }
  },
  {
    "key" : '412321',
    "name" : "CRUD",
    "content" : "Thêm sửa xóa",
    "start_time" : "31-12-2021",
    "end_time" : "31-12-2021",
    "progress" : 90,
    "status" : "On",
    "team" : {
      "id" : '54232',
      "name" : "fixbugs1",
      "leader" : "Tuần",
      "member" : ["Vĩnh", "Tình", "Đức"]
    }
  }
];

  return (
    <>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>{window.location.pathname.replace("/", "")}</Breadcrumb.Item>
    </Breadcrumb>
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

      <Table columns={columns} dataSource={data}  style={{width: '100%'}}/>

      <Modal title="Edit User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
          <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name={['user', 'website']} label="Website">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="Introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button type="primary" htmlType="submit" onClick={handleOk}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
  )
};
export default App;