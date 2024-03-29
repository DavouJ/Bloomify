import React, { useState, useEffect, useContext } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Space, Card, Button, Flex, Row, Col, Layout } from 'antd';

import { usePlants } from '../contexts/PlantContext.jsx';

// internal component imports
import AddPlantModal from '../components/AddPlantModal/index.jsx';
import PlantCard from '../components/PlantCard/index.jsx';
import PlantProfile from '../components/PlantProfile/index.jsx';
import WeatherWidget from "../components/WeatherWidget"
import TaskList from '../components/TaskList';
import { MyPlantsContext, MyPlantsProvider } from '../contexts/ContextMyPlants.jsx';
import { ToDoContext, ToDoProvider } from '../contexts/ContextsToDos'
import { LocationProvider, LocationContext } from '../contexts/ContextLocation';

import '../../src/index.css'

// Styling
const layoutStyle = {
    backgroundColor: 'var(--background-color)',
    padding: 15,
    borderRadius: '1%'
}

function MyPlants() {
    const [addPlantModal, setaddPlantModal] = useState(false);
    // State to hold the currently selected plant for display in the modal
    const [selectedPlantModal, setSelectedPlantModal] = useState(
        {isVisible: false, plant: null});
    // state to retreive data for side widgets
    const { location, setLocation } = useContext(LocationContext);
    const { toDos, setToDos } = useContext(ToDoContext); 
    const { myPlants, setMyPlants } = useContext(MyPlantsContext); 

    function renderPlantCards() {
        // console.log(myPlants); 
        return (
            <>
            {myPlants.map((plant, index) => {
                return (
                <a type="link" onClick={() => handlePlantClick(plant)} key={index} style={{ cursor: 'pointer' }}>
                    <PlantCard plant={plant} style={{height: "300px", width: "250px"}}></PlantCard>
                </a>
                );
            })}        
            </>
        )
    }

    function toggleAddPlantModal(newState) {
        setaddPlantModal(newState);
    }

    const handlePlantClick = (plant) => {
        setSelectedPlantModal({isVisible: true, plant: plant});
    };

    const togglePlantProfileVisibility = (isvisible) => {
        setSelectedPlantModal({...selectedPlantModal, isVisible: isvisible});
    }

    return (
        <>
        <Layout style={layoutStyle}>
            <div 
            id="my-plants-container"
            className='content-container'>
                <Row id="add-plant-btn-container" >
                    <Col span={24}>
                    <h1>My Plant Sanctuary</h1>
                    <Flex gap="small" wrap="wrap" justify="flex-start" align="flex-start">
                        <Button 
                        className="add-plant-button"
                        onClick={() => toggleAddPlantModal(true)} >Add New Plant</Button>
                    </Flex>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    {/* add new plant modal */}
                    <AddPlantModal 
                    addPlantModal={addPlantModal} 
                    toggleAddPlantModal={toggleAddPlantModal}/>
                    {/* if no plants in collection then add button to click here to add new plants */}
                    <Col span={16}>
                        {/* dynamically render plant cards here */}
                        <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            {renderPlantCards()}
                        </Space>
                        </Space>
                    </Col>

                    {/* plant profile hidden */}
                    {selectedPlantModal.isVisible && selectedPlantModal.plant && (
                        <PlantProfile 
                        selectedPlantModalVisible={selectedPlantModal.isVisible}
                        togglePlantProfileVisibility={togglePlantProfileVisibility}
                        selectedPlantModalPlant={selectedPlantModal.plant}
                        myPlants={myPlants}
                        setMyPlants={setMyPlants}
                        onClose={() => setSelectedPlantModal({...selectedPlantModal, isVisible: false})}
                        />
                    )
                    }
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <TaskList toDos={toDos} setToDos={setToDos}/>
                    </Col>
                </Row>
            </div>
        </Layout>
        </>
    )
}

export default MyPlants;

