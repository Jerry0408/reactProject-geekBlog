import React from 'react'
import { Card } from 'antd'
import { Button, Checkbox, Form, Input, message } from 'antd'
import logo from '../../assets/logo3-1.png'
import './index.scss'
import { useStore } from '../../store'
import { useNavigate } from 'react-router-dom'


export default function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  const moblieEdit = (num) => {
    if (num.length === 11) {
      return num
    } else {
      return '1' + num
    }
  }
  const onFinish = async (values) => {
    console.log('Success:', values)
    const mobileNum = moblieEdit(values.phoneNumber)
    await loginStore.getToken({
      mobile: mobileNum,
      code: '246810'
    })
    navigate('/', { replace: true })
    message.success('Login Success!')

  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Please enter any phone number!',
              },
              {
                pattern: /^(1?|(1\-)?)\d{10}$/,
                message: 'Please enter correct US phone number!',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter any 6-digit number',
              },
              {
                pattern: /^\d{6}$/,
                message: 'Please enter any 6-digit number',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="Any 6-digit number" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Sorry you must agree')),
              },
            ]}
          >
            <Checkbox
              className="login-checkbox-label"
            >
              I agree that GZY is a genius.
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
