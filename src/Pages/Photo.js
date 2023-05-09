import React,{useState,useEffect} from 'react';
import '../static/css/Photo.css'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import { Upload, Icon, Modal, message, Button, Row, Col, Input } from 'antd';
import moment from 'moment'

const {TextArea} = Input
function Photo(props){
  const [photoList,setphotoList] = useState()//图片列表
  const [pictureId,setPicture] = useState()
  const [previewVisible,setPreviewVisible] = useState(false)
  const [previewImage,setPreviewImage] = useState('')
  const [addVisible,setAddVisible] = useState(false)
  const [picName,setPicName] = useState()
  const [picUrl,setPicUrl] = useState()
  useEffect (() => {
    getList()
  },[])
  const getList = () => {
    axios({
      method:'get',
      url:servicePath.getPhotoList,
      withCredentials:true
    }).then(res=>{
      let photoInfo = res.data.list
      console.log(res.data.list)
      setphotoList(photoInfo)
    })
  }
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }
  const handleChange = ({ file,fileList }) => {
    console.log(fileList,'fileList','file',file,file.uid)
    if(file.status==='uploading'){
      // const formData = new FormData()
      // fileList.forEach(file => {
      //   formData.append('file', file);
      // });
      // formData.append('name', file.name);
      // formData.append('url', file.url);
      // formData.append("time", new Date().getTime());
      // console.log(formData,'formData')
      // let dataProps = {}
      // dataProps.name = file.name
      // dataProps.url = file.url
      // dataProps.status = file.status
      // // dataProps.introduce = introducemd
      // dataProps.time = (new Date().getTime())
      // axios({
      //   method:'post',
      //   url:servicePath.addPicture,
      //   data:formData,
      //   withCredentials:true,
      // }).then(res=>{
      //   file.id = res.data.insertId
      //   if(res.data.isSuccess){
      //     message.success('上传成功！')
      //     setphotoList(fileList)
      //   }
        
      // }).catch(error=>{
      //   message.error('上传失败！')
      // })
    }else if(file.status==='removed'){
      console.log('删除')
      axios({
        method:'get',
        url:servicePath.delPicture+file.uid,
        withCredentials:true,
      }).then(res=>{
        message.success('删除成功！')
        getList()
      }).catch(error=>{
        message.error('删除失败！')
      })
    }
  }
  const handleCancel = () => {
    setPreviewVisible(false)
  }
  //添加按钮
  const handleAdd = () => {
    setAddVisible(true)
  }
  //添加照片
  const handleSubmitAdd = () => {
    if(!picName){
      message.error('图片名称不能为空！')
      return false
    }else if(!picUrl){
      message.error('图片url不能为空！')
      return false
    }
    let dataProps = {}
    dataProps.name = picName
    dataProps.url = picUrl
    let time = moment().add(10, 'days').calendar()
    let dateText = time.replace('-','/')//改变时间格式
    dataProps.time = (new Date(dateText).getTime())/1000 //变成时间戳
    console.log( dataProps.time,' dataProps.time')
    axios({
      method:'post',
      url:servicePath.addPicture,
      data:dataProps,
      withCredentials:true,
    }).then(res=>{
      if(res.data.isSuccess){
        getList()
        setAddVisible(false)
        message.success('添加照片成功！')
      }
      
    }).catch(error=>{
      message.error('添加照片失败！')
    })
  }
  //取消添加照片
  const handleCancelAdd = () => {
    setAddVisible(false)
  }
  return (
    <div className="clearfix">
    <Button type='primary' onClick={handleAdd} style={{marginBottom:'20px'}}>添加照片</Button>
      <Upload
        // action="http://localhost:3000/index/photo"
        listType="picture-card"
        fileList={photoList}
        onPreview={handlePreview} 
        onChange={handleChange}
      >
        {/* <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
        </div> */}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <Modal
                visible={addVisible}
                title="添加图片"
                background="blue"
                footer={null}
                closable={false}
              >
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>图片名称：</Col>
                <Col span={19}><Input onChange={(e)=>setPicName(e.target.value)} placeholder="请输入图片名称"/></Col>
              </Row>
              <Row style={{paddingBottom:'20px'}}>
                <Col span={5}>图片url :</Col>
                <Col span={19}><TextArea rows={2} onChange={(e)=>setPicUrl(e.target.value)} placeholder="请输入图片url" /></Col>
              </Row>
                <Row style={{textAlign:'center'}}>
                   <Button style={{marginRight:'10px'}} type="primary" onClick={handleSubmitAdd}>提交</Button> 
                   <Button type="primary" onClick={handleCancelAdd}>取消</Button>   
                </Row>
              </Modal>
    </div>
  )
}
export default Photo
