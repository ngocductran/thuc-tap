import { Button, DatePicker, Form, Input, message, Modal, Slider, TreeSelect } from "antd";
import { useEffect } from "react";

interface Team {
	id: string
	name: string
	leader: string
	member: string[]
}


interface init{
    infoTeam: Team[]
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
    
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

export default function ModalCreateWork(props:init){
    const [form] = Form.useForm()
    form.setFieldsValue({team : 0})

    //update work
    const handleOk = () => {
        const index = form.getFieldsValue().team

        const post = {
        'name' : form.getFieldsValue().name,
        'content' : form.getFieldsValue().content,
        'start_time' : form.getFieldsValue().start_time.format("DD-MM-YYYY"),
        'end_time' : form.getFieldsValue().end_time.format("DD-MM-YYYY"),
        'progress' : 0,
        'status' : "Đang Hoạt Động",
        'team' : props.infoTeam[index]
        }

        if(props.update(JSON.stringify(post))){
            message.success("Thêm Thành Công")
            handleCancel()
            form.resetFields()

        }
        else
            message.error("Thêm thất bại")     
    }

    const handleCancel = () =>{
        props.setIsModalVisible(false)
    }

    return(
        <Modal title="Thêm Công Việc" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages} form={form}>
                <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
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
                <Form.Item label="Team" name="team">
                    <TreeSelect treeData={
                        props.infoTeam.map((item, index) =>{
                            return { title: item.name, value: index}
                        }
                    )}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                    <Button type="primary" htmlType="submit" onClick={handleOk}>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

// {this.props.question.answers.map((answer, i) => {     
//     console.log("Entered");                 
//     // Return the element. Also pass key     
//     return (<Answer key={answer} answer={answer} />) 
//  })}