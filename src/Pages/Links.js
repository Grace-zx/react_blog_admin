import React,{useState,useEffect} from 'react';
import '../static/css/links.css'
import { List ,Row ,Col , Modal ,message ,Button,Input,Switch} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;
const {TextArea} = Input
function Links(){
  const [list,setList] = useState()
  const [name,setName] = useState()
  const [linkurl,setLinkUrl] = useState()
  const [visible,setVisible] = useState()
  const [visibletwo,setVisibletwo] = useState()
  const [id,setId] = useState()
  useEffect(()=>{
    getList()
  },[])
  //获取链接列表
  const getList = () => {
    axios({
        method:'get',
        url:servicePath.getLinks,
        withCredentials:true//才能实现中间件的拦截
    }).then(res=>{
      console.log(res,'res')
        setList(res.data.list)
    })
    }
    //修改链接
    const updateLink = (info,id) => {
      setName(info.name)
      setLinkUrl(info.url)
      setId(id)
      setVisibletwo(true)
    }
    const handleSubmitUpdate = () => {
      if(!name){
        message.error('链接名称不能为空！')
        return false
      }else if(!linkurl){
        message.error('链接url不能为空')
        return false
      }
      let dataProps = {}
      dataProps.name = name
      dataProps.url = linkurl
      dataProps.id = id
      axios({
        method:'post',
        url:servicePath.updateLink,
        data:dataProps,
        withCredentials:true
      }).then(res=>{
        if(res.data.isSuccess){
          message.success('修改链接成功！')
          setVisibletwo(false)
          getList()
        }
      }).catch(error=>{
        message.error('链接失败！')
      })
    }
    const handleCancelUpdate = () => {
       setVisibletwo(false)
    }
    //删除链接
    const delLink = (id) => {
      confirm({
          title:'确定要删除该友情链接吗？',
          content:'如果你点击OK，该友情链接将永远被删除，无法恢复',
          onOk(){
              axios(servicePath.delLink+id,{withCredentials:true})
              .then(res=>{
                  message.success('友情链接删除成功!')
                  getList()
              })
          },
          onCancel(){
              message.success('您已取消删除!')
          }
      })
    }
    const handleSubmit = () => {
      if(!name){
        message.error('链接名称不能为空！')
        return false
      }else if(!linkurl){
        message.error('链接url不能为空')
        return false
      }
      let dataProps = {}
      dataProps.name = name
      dataProps.url = linkurl
      axios({
        method:'post',
        url:servicePath.addLink,
        data:dataProps,
        withCredentials:true
      }).then(res=>{
        if(res.data.isSuccess){
          message.success('添加链接成功！')
          setVisible(false)
          getList()
        }
      }).catch(error=>{
        message.error('添加链接失败！')
      })
    }
    const handleCancel = () => {
       setVisible(false)
    }
  return(
     <div>
           <Button style={{marginBottom:'20px'}} type="primary" onClick={()=>setVisible(true)}>添加</Button>
           <br/>
           <List
              header={
                  <Row className="list-div">
                      <Col span={8}>
                          <b>链接名称</b>
                      </Col>
                      <Col span={12}>
                          <b>链接url</b>
                      </Col>
                      <Col span={4}>
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
                              {item.name}
                          </Col>
                          <Col span={12}>
                           {item.url}
                          </Col>
                          <Col span={4}>
                            <Button type="primary" onClick={()=>{updateLink(item,item.id)}}>修改</Button>&nbsp;
                            <Button style={{background:'red'}} onClick={()=>{delLink(item.id)}}>删除 </Button>
                          </Col>
                      </Row>

                  </List.Item>
              )}
              />
              <Modal
                visible={visible}
                title="添加链接"
                background="blue"
                footer={null}
                closable={false}
              >
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>友情链接名称：</Col>
                <Col span={19}><Input onChange={(e)=>setName(e.target.value)} placeholder="请输入友情链接名称"/></Col>
              </Row>
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>友情链接url :</Col>
                <Col span={19}><TextArea rows={2} onChange={(e)=>setLinkUrl(e.target.value)} placeholder="请输入友情链接url" /></Col>
              </Row>
                <Row style={{textAlign:'center'}}>
                   <Button style={{marginRight:'10px'}} type="primary" onClick={handleSubmit}>提交</Button> 
                   <Button type="primary" onClick={handleCancel}>取消</Button>   
                </Row>
              </Modal>
              <Modal
                visible={visibletwo}
                title="修改链接"
                background="blue"
                footer={null}
                closable={false}
              >
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>友情链接名称：</Col>
                <Col span={19}><Input defaultValue={name} onChange={(e)=>setName(e.target.value)} placeholder="请输入友情链接名称"/></Col>
              </Row>
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>友情链接url :</Col>
                <Col span={19}><TextArea defaultValue={linkurl} rows={2} onChange={(e)=>setLinkUrl(e.target.value)} placeholder="请输入友情链接url" /></Col>
              </Row>
                <Row style={{textAlign:'center'}}>
                   <Button style={{marginRight:'10px'}} type="primary" onClick={handleSubmitUpdate}>提交</Button> 
                   <Button type="primary" onClick={handleCancelUpdate}>取消</Button>   
                </Row>

              </Modal>
      </div> 
      
  )
}
export default Links

