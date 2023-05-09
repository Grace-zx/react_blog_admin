import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;

function CheckMessage(props){

  const [list,setList]=useState([])
  const [commentId,setCommentId] = useState('')//留言id
  const [comreply,setComreply] = useState('')//回复评论
  const [thecontent,setTheContent] = useState('')
  const [time,setTime] = useState('')
  const [name,setName] = useState('')
  useEffect(()=>{
    getList()
  },[])
  //获取文章列表
  const getList = () => {
      axios({
          method:'get',
          url:servicePath.getCheckMessage,
          withCredentials:true//才能实现中间件的拦截
      }).then(res=>{
          setList(res.data.list)
      })
  }
  //删除留言的方法
  const delMessage = (id) => {
      confirm({
          title:'确定要删除该条留言吗？',
          content:'如果你点击OK，该条留言将永远被删除，无法恢复',
          onOk(){
              axios(servicePath.delCheckMessage+id,{withCredentials:true})
              .then(res=>{
                  message.success('留言删除成功!')
                  getList()
              })
          },
          onCancel(){
              message.success('您已取消删除!')
          }
      })
  }
  //审核通过留言
  const passMessage = (item) => {
      console.log(item,)
      let dataProps = {}
      // dataProps.id = item.id
      dataProps.name = item.name
      dataProps.content = item.content
      dataProps.datetime = item.time
      dataProps.display = 1
      dataProps.reply = ''
      axios({
        method:'post',//请求方法
        url:servicePath.getPassMessage,//请求url
        data:dataProps,
        withCredentials:true
      }).then(res=>{ 
        if(res.data.isSuccess){
          message.success('留言审核通过！')
          axios(servicePath.delCheckMessage+item.id,{withCredentials:true})
          .then(res=>{
              getList()
          })
        }else{
          message.error('留言审核失败！')
        }
      })

  }
  return (
      <div>
           <List
              header={
                  <Row className="list-div">
                      <Col span={6}>
                          <b>姓名</b>
                      </Col>
                      <Col span={6}>
                          <b>留言内容</b>
                      </Col>
                      <Col span={6}>
                          <b>留言时间</b>
                      </Col>
                      <Col span={6}>
                          <b>操作</b>
                      </Col>
                  </Row>

              }
              bordered
              dataSource={list}
              renderItem={item => (
                  <List.Item>
                      <Row className="list-div">
                          <Col span={6}>
                              {item.name}
                          </Col>
                          <Col span={6}>
                           {item.content}
                          </Col>
                          <Col span={6}>
                           {item.time}
                          </Col>
                          <Col span={6}>
                            <Button type="primary" onClick={()=>{passMessage(item)}}>通过</Button>&nbsp;
                            <Button style={{background:'red'}} onClick={()=>{delMessage(item.id)}}>删除 </Button>
                          </Col>
                      </Row>

                  </List.Item>
              )}
              />

      </div>
  )

}

export default CheckMessage