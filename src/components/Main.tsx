import React, { useEffect, useRef, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, InputNumber, Breadcrumb, DatePicker, Slider, TreeSelect, message, Progress, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
const { confirm } = Modal;


interface DataType {
  id: string;
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


const App: React.FC = () => {

const [isModalVisible, setIsModalVisible] = useState(false);

const [name, setName] = useState()
const [reload, setReload] = useState(true)


const [data, setData] = useState([]);


const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const [infoTeam, setInfoTeam] = useState()
const [idWork, setIdWork] = useState("")

function addModal(){

  setIsModalVisible(true);
}

function showModal(id:string) {

  fetch("http://127.0.0.1:8080/api/work/get/"+id)
  .then(res => res.json())
  .then(
    (result) => {

      form.setFieldsValue({
        name: result.name,
        content:  result.content,
        progress: result.progress,
        status: result.status,
        start_time: moment(result.start_time, 'DD-MM-YYYY'),
        end_time: moment(result.end_time, 'DD-MM-YYYY'),

      });
      
      setInfoTeam(result.team)
      setIdWork(id)
    },

    (error) => {
      console.log(error)
    }
  )

  
  
  setIsModalVisible(true);
};

const success = () => {
  message.success('Thêm thành công');
};
const error = () => {
  message.error('Thất bại');
};


const handleOk = () => {
  const post = {
    'id' :idWork,
    'name' : form.getFieldsValue().name,
    'content' : form.getFieldsValue().content,
    'start_time' : form.getFieldsValue().start_time.format("DD-MM-YYYY"),
    'end_time' : form.getFieldsValue().end_time.format("DD-MM-YYYY"),
    'progress' : form.getFieldsValue().progress,
    'status' : form.getFieldsValue().status,
    'team' : infoTeam
  }


  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
};


fetch('http://127.0.0.1:8080/api/work/edit/'+idWork, requestOptions)
.then(response => response.json())
.then(()=>{
  
  setReload(!reload)
  success()
  setIsModalVisible(false);

},
(error) => {
  error()
}
);


};

const handleCancel = () => {
  setIsModalVisible(false);
};
const showDeleteConfirm = (id:string) => {
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

let color = ""

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
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
    render: (_, { progress }) => (
      <Progress percent={progress} />
  ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (_, { status }) => (
      <Tag color={(status == "Hoàn Thành" ? "green" : (status == "Đang Hoạt Động") ? "geekblue" : "volcano")} key={color}>
        {status}
      </Tag>
    ),
  },
  {
    title: 'Team',
    dataIndex: 'team',
    render: (_, { team }) => (
      team.name
  ), 
  },
  {
    title: <a href='#'><Button onClick={()=>showModal("6")} type="primary"><PlusCircleOutlined /></Button></a>,           
    key: 'action',
    render: (_, {id}) => (
      <Space size="middle">
        <a href='#'><Button onClick={()=>showModal(id)} type="primary"><EditOutlined /></Button></a>
        <a href='#'><Button onClick={()=>showDeleteConfirm(id)} type="primary" danger><DeleteOutlined /></Button></a>
      </Space>
    ),
  },
];


useEffect(() => {
  fetch("http://127.0.0.1:8080/api/work/all")
    .then(res => res.json())
    .then(
      (result) => {
        setData(result)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error)
      }
    )
}, [reload])


const [form] = Form.useForm();

  return (
    <>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>{window.location.pathname.replace("/", "")}</Breadcrumb.Item>
    </Breadcrumb>
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

      <Table columns={columns} dataSource={data}  style={{width: '100%'}} pagination={{ pageSize: 3 }}/>

      <Modal title="Edit User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form {...layout} name="nest-messages" validateMessages={validateMessages} form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
            <Input.TextArea/>
          </Form.Item>
          <Form.Item label="Ngày bắt đầu" rules={[{ required: true }]} name="start_time">
            <DatePicker style={{ width: '50%' }} format={dateFormatList}/>
          </Form.Item>

          <Form.Item label="Ngày dự kiến hoàn thành" rules={[{ required: true }]} name="end_time">
            <DatePicker style={{ width: '50%' }}  format={dateFormatList}/>
          </Form.Item>

          <Form.Item name="progress" label="Tiến Độ" rules={[{ required: true }]}>
            <Slider/>
          </Form.Item>


          <Form.Item label="Trạng Thái" name="status">
            <TreeSelect
              treeData={[
                { title: 'Đang Hoạt Động', value: 'Đang Hoạt Động'},
                { title: 'Tạm Ngưng', value: 'Tạm Ngưng'},
                { title: 'Hoàn Thành', value: 'Hoàn Thành'}
              ]}
            />
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