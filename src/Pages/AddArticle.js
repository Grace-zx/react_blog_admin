import React,{useState,useEffect} from 'react'
import maked from 'marked'
import '../static/css/AddArticle.css'
import {Row,Col,Input,Select,Button,DatePicker, message} from 'antd'
import marked from 'marked'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const {Option} = Select
const {TextArea} = Input
function AddArticle(props){
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState("文章类型") //选择的文章类别
  useEffect(()=>{
    getTypeInfo()
    //获取文章ID
    if(props.location.query){
      let tmpId = props.location.query.id
      setArticleId(tmpId)
      getArticleById(tmpId)
    }else if(props.location.state){
      let tmpId = props.location.state.id
      setArticleId(tmpId)
      getArticleDraftById(tmpId)
    }
  },[])
  //marked解析
  marked.setOptions({
    renderer:marked.Renderer(),
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smartLists:true,
    smartypants:false,
  })
  //文章编辑
  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }
  //文章简介
  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }
  //文章类别
  const getTypeInfo = () =>{
    axios({
      method:'get',
      url:servicePath.getTypeInfo,
      // header:{ 'Access-Control-Allow-Origin':'*' },
      withCredentials: true
     }).then(
     res=>{
         if(res.data.data=="没有登录"){
           localStorage.removeItem('openId')
           props.history.push('/')  
         }else{
          setTypeInfo(res.data.data)
         }

      }
    )
  }
  //改变文章类别
  const selectTypeHandler = (value)=>{
    setSelectType(value)
  }
  //保存文章或修改文章
  const saveArticle = () =>{
    if(!selectedType){
      message.error('文章类型不能为空')
      return false
    }else if(!articleTitle){
      message.error('文章标题不能为空!')
      return false
    }else if(!articleContent){
      message.error('文章内容不能为空!')
      return false
    }else if(!introducemd){
      message.error('文章简介不能为空!')
      return false
    }else if(!showDate){
      message.error('发布日期不能为空!')
      return false
    }
    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let dateText = showDate.replace('-','/')//改变时间格式
    dataProps.addTime = (new Date(dateText).getTime())/1000 //变成时间戳
    if(articleId===0 || props.location.state){
      //新增文章
      dataProps.view_count = 0//访问次数
      axios({
        method:'post',//请求方法
        url:servicePath.addArticle,//请求url
        data:dataProps,
        withCredentials:true
      }).then(res=>{ 
        setArticleId(res.data.insertId)
        if(res.data.isSuccess){
          message.success('文章发布成功！')
          axios(servicePath.delArticleDraft+res.data.insertId,{withCredentials:true})
          .then(res=>{
          })
        }else{
          message.error('文章发布失败！')
        }
      })
    }else{
      //修改文章
      dataProps.id = articleId
      axios({
        method:'post',
        url:servicePath.updateArticle,
        data:dataProps,
        withCredentials:true
      }).then(res=>{
        if(res.data.isSuccess){
          message.success('文章保存成功！')
        }else{
          message.error('文章保存失败！')
        }
      })
    }
  }
  //获取文章列表跳转的文章详情
  const getArticleById = (id) => {
    axios(servicePath.getArticleById+id,{withCredentials:true})
    .then(res=>{
      let articleInfo = res.data.data[0]
      setArticleTitle(articleInfo.title)
      setArticleContent(articleInfo.article_content)
      let html=marked(articleInfo.article_content)
      setMarkdownContent(html)
      setIntroducemd(articleInfo.introduce)
      let tmpInt = marked(articleInfo.introduce)
      setIntroducehtml(tmpInt)
      setShowDate(articleInfo.addTime)
      setSelectType(articleInfo.typeId)
    })
  }
    //获取草稿箱文章列表跳转的文章详情
  const getArticleDraftById = (id) => {
    axios(servicePath.getArticleDraftById+id,{withCredentials:true})
    .then(res=>{
      let articleInfo = res.data.data[0]
      setArticleTitle(articleInfo.title)
      setArticleContent(articleInfo.article_content)
      let html=marked(articleInfo.article_content)
      setMarkdownContent(html)
      setIntroducemd(articleInfo.introduce)
      let tmpInt = marked(articleInfo.introduce)
      setIntroducehtml(tmpInt)
      setShowDate(articleInfo.addTime)
      setSelectType(articleInfo.typeId)
    })
  }
  //暂存文章放入草稿箱
  const saveArticleDraft = () => {
    if(!selectedType){
      message.error('文章类型不能为空')
      return false
    }else if(!articleTitle){
      message.error('文章标题不能为空!')
      return false
    }else if(!articleContent){
      message.error('文章内容不能为空!')
      return false
    }else if(!introducemd){
      message.error('文章简介不能为空!')
      return false
    }else if(!showDate){
      message.error('发布日期不能为空!')
      return false
    }
    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let dateText = showDate.replace('-','/')//改变时间格式
    dataProps.addTime = (new Date(dateText).getTime())/1000 //变成时间戳
    // if(articleId===0){
      //新增文章
      dataProps.view_count = 0//访问次数
      axios({
        method:'post',//请求方法
        url:servicePath.addArticleDraft,//请求url
        data:dataProps,
        withCredentials:true
      }).then(res=>{
        setArticleId(res.data.insertId)
        if(res.data.isSuccess){
          message.success('文章暂存成功！')
          axios(servicePath.delArticle+articleId,{withCredentials:true})
          .then(res=>{
          })
        }else{
          message.error('文章暂存失败！')
        }
      })
    // }
  }
  return (
    <div>
      <Row gutter={5}>
         <Col span={18}>
           <Row gutter={10}>
             <Col span={20}>
               <Input
                   value={articleTitle}
                   placeholder="文章标题"
                   size="large"
                   onChange={e=>setArticleTitle(e.target.value)}
               />
             </Col>
             <Col span={4}>
               &nbsp;
               <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                 { typeInfo.map((item,index)=>{
                       return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                  })
                  }
               </Select>
             </Col>
           </Row>
           <br />
           <Row gutter={10}>
             <Col span={12}>
               <TextArea 
                  value={articleContent} 
                  className="markdown-content" 
                  rows={35}  
                  onChange={changeContent} 
                  // onPressEnter={changeContent}
                  placeholder="文章内容"
               />
             </Col>
             <Col span={12}>
               <div 
                 className="show-html"
                 placeholder="预览内容"
                 dangerouslySetInnerHTML = {{__html:markdownContent}} >
               </div>
             </Col>
           </Row>
         </Col>
         <Col span={6}>
           <Row>
             <Col span={24}>
               <Button size="large" onClick={saveArticleDraft}>暂存文章</Button>&nbsp;
               <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
               <br/>
             </Col>
             <Col span={24}>
               <br/>
               <TextArea
                 rows={4}
                 placeholder="文章简介"
                 value={introducemd}
                 onChange={changeIntroduce}
               >
               </TextArea>
               <br/><br/>
               <div className="introduce-html"
                    placeholder="预览简介"
                    dangerouslySetInnerHTML={{__html:introducehtml}}
               >

               </div>
             </Col>
             <Col span={12}>
               <div className="date-select">
                 <DatePicker
                   placeholder="发布日期"
                   size="large"
                   onChange={(date,dateString)=>{setShowDate(dateString)}}
                 />
               </div>
             </Col>
           </Row>
         </Col>
      </Row>
    </div>
  )
}
export default AddArticle