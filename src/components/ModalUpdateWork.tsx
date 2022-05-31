import { Button, DatePicker, Form, Input, message, Modal, Slider, TreeSelect } from "antd";

interface init{
    form: any
    infoTeam: Object
    update: Function
    isModalVisible: boolean
    setIsModalVisible: Function

}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

export default function ModalUpdateWork(props:init){
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

    //update work
    const handleOk = () => {
        const post = {
        'name' : props.form.getFieldsValue().name,
        'content' : props.form.getFieldsValue().content,
        'start_time' : props.form.getFieldsValue().start_time.format("DD-MM-YYYY"),
        'end_time' : props.form.getFieldsValue().end_time.format("DD-MM-YYYY"),
        'progress' : props.form.getFieldsValue().progress,
        'status' : props.form.getFieldsValue().status,
        'team' : props.infoTeam
        }

        if(props.update(JSON.stringify(post))){
            message.success("Thay Đổi Thành Công")
            handleCancel()
        }
        else
            message.error("Thay đổi thất bại")
            
    }

    const handleCancel = () =>{
        props.setIsModalVisible(false)
    }

    return(
        <Modal title="Edit User" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages} form={props.form}>
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
                    <TreeSelect treeData={[
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
    )
}