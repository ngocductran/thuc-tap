import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Form, Breadcrumb, Progress, Tag } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'

import { getAllWork, updateWork, getWorkByID, delWorkByID } from '../Services/api'
import ModalUpdateWork from './ModalUpdateWork'
import ModalDeleteWork from './ModalDeleteWork'


interface DataType {
	id: string
	name: string
	content: string
	start_time: string
	end_time: string
	progress: number
	status: string
	team: Team
}

interface Team {
	id: string
	name: string
	leader: string
	member: string[]
}

const App: React.FC = () => {

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [reload, setReload] = useState(true)
	const [data, setData] = useState([])

	const [form] = Form.useForm()

	const [infoTeam, setInfoTeam] = useState("")
	const [idWork, setIdWork] = useState("")

	const color = NaN

	useEffect(()=> {
		async function fetchDataAllWork(): Promise<void> {
			const data = await getAllWork("/all")
			setData(data.data)
		}

		fetchDataAllWork()
	}, [reload])

	async function showModal(id:string) {
		const result = (await getWorkByID("/get/" + id)).data

		form.setFieldsValue({
			name: result.name,
			content:  result.content,
			progress: result.progress,
			status: result.status,
			start_time: moment(result.start_time, 'DD-MM-YYYY'),
			end_time: moment(result.end_time, 'DD-MM-YYYY'),
		})
		
		setInfoTeam(result.team)
		setIdWork(id)
		setIsModalVisible(true)
	}

	//update work
	function sendDataToUpdateWork(post:string){
		try{
			updateWork("/edit/" + idWork, post)
			setReload(!reload)
			return true
		}catch(error){
			return false
		}
	}

	function sendDeleteWork(id:string){
		try {
			delWorkByID("/del/" + id)
			setReload(!reload)
			return true
		} catch (error) {
			return false
		}
	}

	const columns: ColumnsType<DataType> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			// render: text => <a>{text}</a>,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
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
			// title: <a href='#'><Button onClick={()=>showModal("6")} type="primary"><PlusCircleOutlined /></Button></a>,
			title: "Thêm",
			key: 'action',
			render: (_, {id}) => (
			<Space size="middle">
				<Button onClick={()=>showModal(id)} type="primary"><EditOutlined /></Button>
				<ModalDeleteWork id={id} del={sendDeleteWork}></ModalDeleteWork>
			</Space>
			),
		},
	]
  
	return (
		<>
		<Breadcrumb style={{ margin: '16px 0' }}>
			<Breadcrumb.Item>User</Breadcrumb.Item>
			<Breadcrumb.Item>{window.location.pathname.replace("/", "")}</Breadcrumb.Item>
		</Breadcrumb>
		<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
			<Table columns={columns} dataSource={data}  style={{width: '100%'}} pagination={{ pageSize: 3 }}/>
			<ModalUpdateWork form={form} update={sendDataToUpdateWork} isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible} infoTeam={infoTeam}/>
		</div>
		</>
  )
}

export default App