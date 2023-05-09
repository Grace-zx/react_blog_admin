import React ,{useState} from 'react'
import 'antd/dist/antd.css'
import {Card,Input,Icon,Button,Spin,message} from 'antd'
import '../static/css/Login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'

function Login(props){
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)//防止重复提交

  const CheckLogin = ()=>{
    setIsLoading(true)//登录之后就加载
    if(!userName){
      message.error('用户名不能为空')
      setTimeout(()=>{
        setIsLoading(false)
      },500)
      return false
    }else if(!password){
      message.error('密码不能为空')
      setTimeout(()=>{
        setIsLoading(false)
      },500)
      return false
    }
    let dataProps = {
      'userName':userName,
      'password':password
    }
    axios({
      method:'post',
      url:servicePath.checkLogin,
      data:dataProps,
      withCredentials:true,//前端和后端共享session
    }).then(res=>{
      setIsLoading(false)
      if(res.data.data=='登录成功'){
          localStorage.setItem('openId',res.data.openId)
          props.history.push('/index')
      }else{
          message.error('用户名密码错误')
      }
    })
  }

  return(
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
          <Card title="ZHOUXU blog System" style={{width:400}} bordered={true}>
            <Input id="userName" 
                   size="large"
                   placeholder="Enter you userName"
                   prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}/>}//  图标
                   onChange={(e)=>{setUserName(e.target.value)}}
            />
            <br/><br/>
            <Input.Password 
                   id="password" 
                   size="large"
                   placeholder="Enter you passWord"
                   prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}}/>}//  图标
                   onChange={(e)=>{setPassword(e.target.value)}}
            />
            <br/><br/>
            <Button type="primary" size="large" block onClick={CheckLogin}>Login in</Button>
          </Card>
      </Spin>
    </div>
  )
}
export default Login