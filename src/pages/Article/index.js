import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '../../assets/error.png'
import './index.scss'
import { useEffect, useState } from 'react'
import { http } from '../../utils'
import { useStore } from '../../store'
import { observer } from 'mobx-react-lite'

const { Option } = Select
const { RangePicker } = DatePicker



const Article = () => {
  const navigate = useNavigate()
  const { channelStore } = useStore()

  const [articles, setArticles] = useState({
    list: [],
    count: 0
  })
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })

  const onSearch = (values) => {
    const { status, channel_id, date } = values
    const _params = {}
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    setParams({
      ...params,
      ..._params
    })
  }

  const pageChange = (cur_page) => {
    setParams({
      ...params,
      page: cur_page
    })
  }

  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    const temp = { ...params }
    setParams(temp)
  }

  const goPublish = (data) => {
    navigate(`/layout/publish?id=${data.id}`)
  }

  useEffect(() => {
    const loadArticles = async () => {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data.data
      console.log(results, total_count)
      if (total_count !== 0 && results.length === 0) {
        console.log(1111111)
        setParams({ ...params, page: params.page - 1 })
        return
      }
      console.log(res)
      setArticles({
        list: results,
        count: total_count
      })
    }
    loadArticles()
  }, [params])


  const columns = [
    {
      title: '??????',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={200} height={150} alt="" />
      }
    },
    {
      title: '??????',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '??????',
      dataIndex: 'status',
      render: data => <Tag color="green">????????????</Tag>
    },
    {
      title: '????????????',
      dataIndex: 'pubdate'
    },
    {
      title: '?????????',
      dataIndex: 'read_count'
    },
    {
      title: '?????????',
      dataIndex: 'comment_count'
    },
    {
      title: '?????????',
      dataIndex: 'like_count'
    },
    {
      title: '??????',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)}
            />
            <Popconfirm
              title="Confirm to delete?"
              onConfirm={() => delArticle(data)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/layout/home">??????</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>????????????</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          initialValues={{
            status: -1,
          }}
          onFinish={onSearch}
        >
          <Form.Item label="??????" name="status">
            <Radio.Group>
              <Radio value={-1}>??????</Radio>
              <Radio value={0}>??????</Radio>
              <Radio value={1}>?????????</Radio>
              <Radio value={2}>????????????</Radio>
              <Radio value={3}>????????????</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="??????" name="channel_id">
            <Select
              placeholder="?????????????????????"
              style={{ width: 120 }}
            >
              {channelStore.channelList.map(channel => (
                <Option value={channel.id} key={channel.id}>{channel.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="??????" name="date">
            {/* ??????locale?????? ??????????????????*/}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              ??????
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`?????????????????????????????? ${articles.count} ????????????`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articles.list}
          pagination={{
            pageSize: params.per_page,
            total: articles.count,
            onChange: pageChange
          }}
        />
      </Card>
    </div>
  )
}

export default observer(Article)