import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;

function ArticleDraft(props){

  const [list,setList]=useState([])
  useEffect(()=>{
    getList()
  },[])
  //获取文章列表
  const getList = () => {
      axios({
          method:'get',
          url:servicePath.getDraftList,
          withCredentials:true//才能实现中间件的拦截
      }).then(res=>{
          setList(res.data.list)
      })
  }
  //删除文章的方法
  const delArticleDraft = (id) => {
      confirm({
          title:'确定要删除这篇博客文章吗？',
          content:'如果你点击OK，文章将永远被删除，无法恢复',
          onOk(){
              axios(servicePath.delArticleDraft+id,{withCredentials:true})
              .then(res=>{
                  message.success('文章删除成功!')
                  getList()
              })
          },
          onCancel(){
              message.success('您已取消删除!')
          }
      })
  }
  //修改文章的跳转方法
  const updateArticleDraft = (id) => {
      props.history.push(({ pathname: "/index/add", state: { id } }))
  } 
  const saveArticle = (id) => {
      //先获取文章详情内容
      axios(servicePath.getArticleDraftById+id,{withCredentials:true})
      .then(res=>{
            let articleInfo = res.data.data[0]
            let dataProps = {}
            dataProps.type_id = articleInfo.typeId
            dataProps.title = articleInfo.title
            dataProps.article_content = articleInfo.article_content
            dataProps.introduce = articleInfo.introduce
            let dateText = articleInfo.addTime.replace('-','/')//改变时间格式
            dataProps.addTime = (new Date(dateText).getTime())/1000 //变成时间戳
        
        dataProps.view_count = 0//访问次数
        axios({
          method:'post',//请求方法
          url:servicePath.addArticle,//请求url
          data:dataProps,
          withCredentials:true
        }).then(res=>{ 
          if(res.data.isSuccess){
            message.success('文章发布成功！')
            axios(servicePath.delArticleDraft+id,{withCredentials:true})
            .then(res=>{
                getList()
            })
          }else{
            message.error('文章发布失败！')
          }
        })
      })

  }
  return (
      <div>
           <List
              header={
                  <Row className="list-div">
                      <Col span={8}>
                          <b>标题</b>
                      </Col>
                      <Col span={5}>
                          <b>类别</b>
                      </Col>
                      <Col span={5}>
                          <b>发布时间</b>
                      </Col>
                      {/* <Col span={3}>
                          <b>集数</b>
                      </Col>
                      <Col span={3}>
                          <b>浏览量</b>
                      </Col> */}
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
                          <Col span={8}>
                              {item.title}
                          </Col>
                          <Col span={5}>
                           {item.typeName}
                          </Col>
                          <Col span={5}>
                              {item.addTime}
                          </Col>
                          {/* <Col span={3}>
                              共<span>{item.part_count}</span>集
                          </Col>
                          <Col span={3}>
                            {item.view_count}
                          </Col> */}

                          <Col span={6}>
                            <Button type="primary" onClick={()=>{saveArticle(item.id)}}>发布</Button>&nbsp;
                            <Button type="primary" onClick={()=>{updateArticleDraft(item.id)}}>修改</Button>&nbsp;
                            <Button style={{background:'red'}} onClick={()=>{delArticleDraft(item.id)}}>删除 </Button>
                          </Col>
                      </Row>

                  </List.Item>
              )}
              />

      </div>
  )

}

export default ArticleDraft