import React, { Component, useEffect, useState } from 'react';
import {Avatar, Divider,Row,Col,List,Button, Modal,Input, message} from 'antd'
import '../static/css/Information.css'
import axios from 'axios'
import servicePath from '../config/apiUrl';

const {TextArea} = Input
const Author = () => {
  const [list,setList] = useState() 
  const [visible,setVisible] = useState()
  const [name ,setName] = useState()
  const [introduce,setIntroduce] = useState()
  const [github,setGithub] = useState()
  const [qq,setQq] = useState()
  const [wechat,setWechat] = useState()
  const [email,setEmail] = useState()
  const [id,setId] = useState()
  useEffect(()=>{
    getList()
  },[])
  const getList = () => {
    axios({
        method:'get',
        url:servicePath.getInformation,
        withCredentials:true//才能实现中间件的拦截
    }).then(res=>{
        setList(res.data.data)
    })
}
const updateInformation = () => {
  setName(list[0].name)
  setIntroduce(list[0].introduce)
  setGithub(list[0].github)
  setQq(list[0].qq)
  setWechat(list[0].wechat)
  setEmail(list[0].email)
  setId(list[0].id)
  setVisible(true)
}
const handleSubmit = () =>{
  if(!name){
    message.error('请填写名字！')
    return false
  }
  else if(!introduce){
    message.error('请填写自我介绍！')
    return false
  }else if(!github){
    message.error('请填写github！')
    return false
  }else if(!qq){
    message.error('请填写QQ！')
    return false
  }else if(!wechat){
    message.error('请填写Wechat！')
    return false
  }else if(!email){
    message.error('请填写Email！')
    return false
  }
  const dataProps = {}
  dataProps.name = name
  dataProps.introduce = introduce
  dataProps.github = github
  dataProps.qq = qq
  dataProps.wechat = wechat
  dataProps.email = email
  dataProps.id = id
  axios({
    method:'post',
    url:servicePath.updateInformation,
    data:dataProps,
    withCredentials:true
  }).then(res=>{
    if(res.data.isSuccess){
      message.success('修改成功！')
      getList()
    }
  }).catch(error=>{
    message.error('修改失败！')
  })
  setVisible(false)
}
const handleCancel = () => {
  setVisible(false)
}
  return (
    <div>
    <List
       header={
           <Row className="list-div">
               <Col span={2}>
                   <b>名字</b>
               </Col>
               <Col span={8}>
                   <b>自我介绍</b>
               </Col>
               <Col span={4}>
                   <b>github</b>
               </Col>
               <Col span={3}>
                   <b>QQ</b>
               </Col>
               <Col span={2}>
                   <b>Wechat</b>
               </Col>
               <Col span={3}>
                   <b>Email</b>
               </Col>
               <Col span={2}>
                   <b>操作</b>
               </Col>
           </Row>

       }
       bordered
       dataSource={list}
       renderItem={item => (
           <List.Item>
               <Row className="list-div">
                   <Col span={2}>
                       {item.name}
                   </Col>
                   <Col span={8}>
                    {item.introduce}
                   </Col>
                   <Col span={4}>
                       {item.github}
                   </Col>
                   <Col span={3}>
                       {item.qq}
                   </Col>
                   <Col span={2}>
                     {item.wechat}
                   </Col>
                   <Col span={3}>
                     {item.email}
                   </Col>
                   <Col span={2}>
                     <Button type="primary" onClick={()=>{updateInformation(item.id)}}>修改</Button>&nbsp;
                     {/* <Button style={{background:'red'}} onClick={()=>{delArticle(item.id)}}>删除 </Button> */}
                   </Col>
               </Row>

           </List.Item>
       )}
       />
       <Modal
                visible={visible}
                title="修改个人资料"
                background="blue"
                footer={null}
                closable={false}
              >
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>名字：</Col>
                <Col span={19}><Input defaultValue={name} onChange={(e)=>setName(e.target.value)} placeholder="请输入名字："/></Col>
              </Row>
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>自我介绍 :</Col>
                <Col span={19}><TextArea defaultValue={introduce} rows={2} onChange={(e)=>setIntroduce(e.target.value)} placeholder="请输入自我介绍" /></Col>
              </Row>
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>github :</Col>
                <Col span={19}><Input defaultValue={github} onChange={(e)=>setGithub(e.target.value)} placeholder="请输入github"/></Col>
              </Row>
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>QQ :</Col>
                <Col span={19}><Input defaultValue={qq} onChange={(e)=>setQq(e.target.value)} placeholder="请输入QQ"/></Col>
              </Row>
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>Wechat :</Col>
                <Col span={19}><Input defaultValue={wechat} onChange={(e)=>setWechat(e.target.value)} placeholder="请输入Wechat"/></Col>
              </Row>
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>Email :</Col>
                <Col span={19}><Input defaultValue={email} onChange={(e)=>setEmail(e.target.value)} placeholder="请输入Email"/></Col>
              </Row>
                <Row style={{textAlign:'center'}}>
                   <Button style={{marginRight:'10px'}} type="primary" onClick={handleSubmit}>提交</Button> 
                   <Button type="primary" onClick={handleCancel}>取消</Button>   
                </Row>

              </Modal>

</div>
  )
}

export default Author
