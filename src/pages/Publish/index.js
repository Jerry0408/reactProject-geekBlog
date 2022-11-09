import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '../../store'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { values } from 'mobx'
import { http } from '../../utils'


const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  const [fileList, setFileList] = useState([])
  const [picNum, setPicNum] = useState(0)
  const cacheImgList = useRef()
  const form = useRef()
  const navigate = useNavigate()

  const [params] = useSearchParams()
  const id = params.get('id')

  useEffect(() => {
    const loadPrevious = async () => {
      const res = await http.get(`/mp/articles/${id}`)
      const saved_data = res.data.data
      const num = saved_data.cover.type
      const img_list = saved_data.cover.images.map(url => {
        return {
          url
        }
      })
      form.current.setFieldsValue({
        ...saved_data,
        type: num > 1 ? 3 : num
      })

      setFileList(img_list)
      setPicNum(num)
      cacheImgList.current = img_list

    }
    if (!id) {
      return
    }
    loadPrevious()

  }, [id])

  const onUploadChange = (res) => {
    const { fileList } = res
    const formattedList = fileList.map(file => {
      if (file.response) {
        return { url: file.response.data.url }
      }
      else {
        return file
      }
    })
    setFileList(formattedList)
    cacheImgList.current = formattedList
  }

  const radioChange = (e) => {
    const num = e.target.value
    setPicNum(num)
    setFileList(cacheImgList.current?.slice(0, num) || [])
  }

  const sumbitArticle = async (values) => {
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    if (id) {
      await http.put(`/mp/articles/${id}?draft=false`, params)
    } else {
      await http.post('/mp/articles?draft=false', params)
    }
    navigate('/layout/article')
    message.success('Upload Success')
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? 'Edit' : 'Publish'} Article</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            type: 0,
            content: 'gzy is so smart'
          }}
          onFinish={sumbitArticle}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(item => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}

            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group
                onChange={radioChange}
              >
                <Radio value={0}>无图</Radio>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>

              </Radio.Group>
            </Form.Item>
            {picNum > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={picNum > 1}
                maxCount={picNum}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}


          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? 'Update' : 'Publish'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)