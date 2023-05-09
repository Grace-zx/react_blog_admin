import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Input,Row ,Col ,Form , Modal ,message ,Button,Comment} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;
const { TextArea } = Input

function Message(props){
  const [comment,setComment] = useState([])//留言列表
  const [commentId,setCommentId] = useState('')//留言id
  const [mevisible,setVisible] = useState(false)//弹出框显示与隐藏
  const [comreply,setComreply] = useState('')//回复评论
  const [thecontent,setTheContent] = useState('')
  const [time,setTime] = useState('')
  const [name,setName] = useState('')
  useEffect(()=>{
    axios({
      method:'get',
      url:servicePath.getMessageList,
      withCredentials:true
    }).then(res=>{
      setComment(res.data.list)
    })
  },[])
  const handleReply = (id,content,time,name) => {
    console.log(content,time,typeof time,'oooo')
    setCommentId(id)
    setTheContent(content)
    setTime(time)
    setName(name)
    setVisible(true)
  }
  //删除留言
  const handledelete = (id) => {
    confirm({
      title:'确定要删除该条留言？',
      content:'如果你点击OK，该条留言将永远被删除，无法恢复',
      onOk(){
          axios(servicePath.delMessage+id,{withCredentials:true})
          .then(res=>{
              axios({
                method:'get',
                url:servicePath.getMessageList,
                withCredentials:true
              }).then(res=>{
                setComment(res.data.list)
              })
              message.success('留言删除成功!')         
          })
      },
      onCancel(){
          message.success('您已取消删除!')
      }
    })
  }
  const handleTextChange = (e) => {
    setComreply(e.target.value)
  }
  //确定回复留言
  const handleOk = () => {
    console.log(commentId,comreply,typeof comreply,'iddd')
    let dataProps = {}
    dataProps.id = commentId
    dataProps.reply = comreply
    dataProps.content = thecontent
    let dateText = time.replace('-','/')
    dataProps.datetime = (new Date(dateText).getTime())/1000
    // console.log(dataProps.time,typeof dataProps.time,'dataProps.time')
    dataProps.name = name
    axios({
      method:'post',
      url:servicePath.getMessageReply,
      data:dataProps,
      withCredentials:true
    }).then(res=>{
      axios({
        method:'get',
        url:servicePath.getMessageList,
        withCredentials:true
      }).then(res=>{
        setComment(res.data.list)
        message.success('回复成功!')
        setVisible(false)
      })         
    })
  }
  //取消回复留言
  const handleCancel = () => {
    setVisible(false)
  }
  //删除博主回复
  const handledeleteReply = (id) => {
    confirm({
      title:'确定要删除该条回复？',
      content:'如果你点击OK，该条回复将永远被删除，无法恢复',
      onOk(){
          axios(servicePath.delMessageReply+id,{withCredentials:true})
          .then(res=>{
            axios({
              method:'get',
              url:servicePath.getMessageList,
              withCredentials:true
            }).then(res=>{
              setComment(res.data.list)
              message.success('回复删除成功!')
            })         
          })
      },
      onCancel(){
          message.success('您已取消删除!')
      }
    })
  }
  return (
      <div>
        <List
          className="comment-list"
          // header={`${data.length} replies`}
          itemLayout="horizontal"
          dataSource={comment}
          renderItem={item => (
            <li>
              <Comment
                actions={[<span key="comment-list-reply-to-0" onClick={()=>handleReply(item.id,item.content,item.time,item.name)}>回复</span>,
                          <span key="comment-list-reply-to-1" onClick={()=>handledelete(item.id)}>删除</span>]}
                author={item.name}
                avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                content={item.content}
                datetime={item.time}
                children={item.reply?
                     <p>
                       <Comment
                         actions={[<span key="comment-list-reply-to-1" onClick={()=>handledeleteReply(item.id)}>删除</span>]}
                         author='博主'
                         avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                         content={item.reply}
                       />
                     </p>:null}
              />
            </li>
          )}
        />
        <div>
          <Modal
           title="回复"
           visible={mevisible}
           onOk={handleOk}
           onCancel={handleCancel}
          >
          <div>
            <TextArea rows={4} onChange={handleTextChange} placeholder="请输入" />
          </div>
                
          </Modal>
        </div>
      </div>
  )

}

export default Message