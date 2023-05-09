import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
// import '../static/css/AdminIndex.css'
import {Route} from "react-router-dom"
import AddArticle from './AddArticle.js'
import ArticleList from './ArticleList'
import ArticleDraft from './ArticleDraft'
import Message from './Message.js'
import CheckMessage from './CheckMessage.js'
import Photo from './Photo'
import Links from './Links'
import Information from './Information'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props){

  const [collapsed,setCollapsed] = useState(false)
  //侧边栏宽度大小调节
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };
  //文章列表
  const handleClickArticle = e=>{
    if(e.key==='addArticle'){
      props.history.push('/index/add')
    }else{
      props.history.push('/index/list')
    }
  }
  //草稿箱管理
  const handleClickDraft = e => {
    props.history.push('/index/draft')
  }
  // 留言管理
  const handleClickMessage = (e) => {
    if(e.key==='checkMessage'){
      props.history.push('/index/checkMessage')
    }else{
      props.history.push('/index/message')
    }
  }
  //相册管理
  const handleClickPhoto = (e) => {
    props.history.push('/index/photo')
  }
  //链接管理
  const handleClickLinks = (e) => {
    props.history.push('/index/link')
  }
  //个人信息管理
  const handleClickInformation = (e) => {
    props.history.push('/index/information')
  }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>工作台</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              onClick={handleClickArticle}
              title={
              <span>
                  <Icon type="desktop" />
                  <span>文章管理</span>
              </span>
              }
            >
              <Menu.Item key="addArticle">添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>

            </SubMenu>
            <Menu.Item key="articleDraft" onClick={handleClickDraft}>
              <Icon type="database" />
              <span>草稿箱管理</span>
            </Menu.Item>
            <SubMenu
              key="sub2"
              onClick={handleClickMessage}
              title={
              <span>
                  <Icon type="desktop" />
                  <span>留言管理</span>
              </span>
              }
            >
              <Menu.Item key="checkMessage">审核留言</Menu.Item>
              <Menu.Item key="messageList">留言列表</Menu.Item>

            </SubMenu>
            {/* <Menu.Item key="9" onClick={handleClickMessage}>
              <Icon type="file"/>
              <span>留言管理</span>
            </Menu.Item> */}
            <Menu.Item key="10" onClick={handleClickPhoto}>
              <Icon type="picture"/>
              <span>相册管理</span>
            </Menu.Item>
            <Menu.Item key="11" onClick={handleClickLinks}>
              <Icon type="link"/>
              <span>友情链接管理</span>
            </Menu.Item>
            <Menu.Item key="12" onClick={handleClickInformation}>
              <Icon type="solution"/>
              <span>个人信息管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Route path="/index/" exact  component={AddArticle} />
                <Route path="/index/add/" exact   component={AddArticle} />
                <Route path="/index/add/:id"  exact   component={AddArticle} />
                <Route path="/index/list/" exact  component={ArticleList} />
                <Route path="/index/draft/" exact  component={ArticleDraft} />
                <Route path="/index/message/" exact  component={Message} />
                <Route path="/index/checkMessage/" exact  component={CheckMessage} />
                <Route path="/index/photo/" exact  component={Photo} />
                <Route path="/index/link/" exact  component={Links} />
                <Route path="/index/information/" exact  component={Information} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>zhouxu</Footer>
        </Layout>
      </Layout>
    )

}

export default AdminIndex