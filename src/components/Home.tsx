import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Form, Breadcrumb, Progress, Tag } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import moment from 'moment'

import { getAllWork, updateWork, getWorkByID, delWorkByID, createWork } from '../Services/api'
import { getAllTeam } from '../Services/apiTeam'


import ModalUpdateWork from './ModalUpdateWork'
import ModalDeleteWork from './ModalDeleteWork'
import ModalCreateWork from './ModalCreateWork'


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
	const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false)

	const [reload, setReload] = useState(true)
	const [data, setData] = useState([])

	const [form] = Form.useForm()

	const [infoTeam, setInfoTeam] = useState("")
	const [idWork, setIdWork] = useState("")

	const [teams, setTeams] = useState([])

	const color = NaN

	useEffect(()=> {
		async function fetchDataAllWork(): Promise<void> {
			const data = await getAllWork("/all")
			setData(data.data.reverse())
		}

		fetchDataAllWork()
	}, [reload])

	useEffect(()=>{
		async function fetchDataAllTeam(): Promise<void> {
			const data = await getAllTeam("/all")
			setTeams(data.data)
		}
		fetchDataAllTeam()
	},[])

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

	function sendCreateWork(data:string){
		try {
			createWork("/add", data)
			setReload(!reload)
			return true
		} catch (error) {
			return false
		}
	}

	const columns: ColumnsType<DataType> = [
		{
			title: 'Tên Công Việc',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Nội Dung Công Việc',
			dataIndex: 'content',
			key: 'content',
		},
		{
			title: 'Ngày Bắt đầu',
			dataIndex: 'start_time',
			key: 'start_time',
		},
		{
			title: 'Ngày Kết thúc',
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
			title: <a href='#'><Button onClick={()=>setIsModalVisibleCreate(true)} type="primary"><PlusCircleOutlined /></Button></a>,
			// title: "Thêm",
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
			<Breadcrumb.Item>Công Việc</Breadcrumb.Item>
			<Breadcrumb.Item>{window.location.pathname.replace("/", "")}</Breadcrumb.Item>
		</Breadcrumb>
		<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
			<Table columns={columns} dataSource={data}  style={{width: '100%'}} pagination={{ pageSize: 3 }}/>
			<ModalUpdateWork form={form} update={sendDataToUpdateWork} isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible} infoTeam={infoTeam}/>
			<ModalCreateWork infoTeam={teams} isModalVisible={isModalVisibleCreate} 
			setIsModalVisible={setIsModalVisibleCreate} update={sendCreateWork}/>
		</div>

		</>
  )
}

export default App