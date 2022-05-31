import React from 'react';
import { Popconfirm, message, Button,  } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface init{
    id: string
    del: Function 
}

export default function ModalDeleteWork(props:init){

    const confirm = () => {
        //xóa thành công
        if(props.del(props.id))
            message.success('Xóa thành công công việc')
        //xóa thất bại
        else
            message.error('Không thể xóa công việc')  
    }
      
    return(
        <Popconfirm
            title="Xóa công việc này?"
            okText="Có"
            cancelText="Không"
            okType='danger'
            onConfirm={confirm}
        >
            <Button type="primary" danger><DeleteOutlined /></Button>
        </Popconfirm>
    )
}
