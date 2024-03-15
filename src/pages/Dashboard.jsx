import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Layout, Flex, Divider } from 'antd';

import TaskList from '../components/TaskList';
import DashWaterLog from '../components/DashWaterLog';
import DashSearchBar from '../components/DashSearchBar';
import PlantOfTheDay from '../components/PlantOfTheDay';
import WeatherWidget from '../components/WeatherWidget';
import DashPlantCard from '../components/DashPlantCard'
import { ToDoContext, ToDoProvider } from '../contexts/ContextsToDos';
import { MyPlantsContext, MyPlantsProvider } from '../contexts/ContextMyPlants';
import { LocationProvider, LocationContext } from '../contexts/ContextLocation';
import '../../src/index.css'
import SearchBar from '../components/SearchBar';

// Basic page CSS
const layoutStyle = {
  backgroundColor: 'var(--background-color)',
  padding: 15,
  justifyContent: "center",
}

const Dashboard = () => {
  const { toDos, setToDos } = useContext(ToDoContext);
  const { location, setLocation } = useContext(LocationContext)
  const { myPlants, setMyPlants } = useContext(MyPlantsContext);
  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  
  useEffect(() => {
    const storageUserName = localStorage.getItem('username')
    if (storageUserName) {
      setUserName(storageUserName)
    }
  }, [])

  return (
    <>
      <SearchBar />
      <Divider className='divider'/>
      {/* PLACEHOLDER _ SMALL LEAF IMAGE */}

      <div id="dashboard-container"
        className='content-container'>
        <Flex style={layoutStyle}  >
          <Row sm={24}  >
            <Col sm={23} md={14} 
            style={{ marginLeft: 8, marginRight: 8 }}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <h1 id='dash-title' >Welcome back, {userName || 'Guest'} 😊</h1>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} 
                style={{ marginBottom: 16 }}>
                  <PlantOfTheDay />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 16 }}>
                  {/* Assuming DashPlantCard is to be rendered for each plant. Adjust if it's just one card. */}
                  <DashPlantCard myPlants={myPlants} />
                </Col>
              </Row>
              <Row gutter={16}>


                  
              </Row>
            </Col>
            <Col sm={1} md={1}>
              <Divider 
              className='vertical-divider'
              type="vertical"/>
            </Col>
            <Col sm={24} md={8} 
            style={{ marginLeft: 8, marginRight: 8 }}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 16 }}>
                  <WeatherWidget location={location} setLocation={setLocation} />
                </Col>
              
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 16 }}>
                  <ToDoProvider>
                    <TaskList toDos={toDos} setToDos={setToDos} />
                  </ToDoProvider>
                </Col>
              </Row>
            </Col>
          </Row>
        </Flex>
      </div>
    </>
  );


};

export default Dashboard;
