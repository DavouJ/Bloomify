import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Layout, Flex } from 'antd';

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

// Basic page CSS
const layoutStyle = {
  backgroundColor: 'var(--background-color)',
  margin: "auto !important",
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
      <div id="dashboard-container"
        className='content-container'>
        <h1>Welcome back {userName || 'Guest'}!</h1>
        <Flex style={layoutStyle}  >
          <Row xs={24} sm={24} md={24} >
            <Col xs={24} sm={24} md={15} style={{ marginLeft: 8, marginRight: 8 }}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 16 }}>
                  {/* Assuming DashPlantCard is to be rendered for each plant. Adjust if it's just one card. */}

                  <DashPlantCard myPlants={myPlants} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                  <WeatherWidget location={location} setLocation={setLocation} />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                  <PlantOfTheDay />
                </Col>

              </Row>
            </Col>

            <Col sm={24} md={8} style={{ marginLeft: 8, marginRight: 8 }}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 16 }}>
                  <ToDoProvider>
                    <TaskList toDos={toDos} setToDos={setToDos} />
                  </ToDoProvider>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 16 }}>
                  <DashSearchBar name={name} setName={setName}/>
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
