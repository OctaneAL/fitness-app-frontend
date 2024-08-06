import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { filterExercises, getDifficulties, getEquipment, getBodyRegionsForMuscleGroup, getMuscleGroupId } from '../services/api'; // Import your filtering function
import Select from 'react-select';

function MuscleGroupCatalog() {
    const fromUrlFormat = (url) => {
        return url.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };    

    const { muscle_group } = useParams();
    const muscleGroupName = fromUrlFormat(muscle_group);
    const [muscleGroupId, setMuscleGroupId] = useState(null);

    // States for filters
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [bodyRegion, setBodyRegion] = useState([]);

    // State for storing search results
    const [exercises, setExercises] = useState([]);

    // States for options
    const[difficultyOptions, setDifficultyOptions] = useState([]);
    const[equipmentOptions, setEquipmentOptions] = useState([]);
    const[bodyRegionOptions, setBodyRegionOptions] = useState([]);

    // States for converting IDs to Names
    const[difficultyMap, setDifficultyMap] = useState({});
    const[equipmentMap, setEquipmentMap] = useState({});
    const[bodyRegionMap, setBodyRegionMap] = useState({});

    const handleSearch = async () => {
        const difficultyIds = difficulty.map(option => option.value);
        const equipmentIds = equipment.map(option => option.value);
        const bodyRegionIds = bodyRegion.map(option => option.value);

        const results = await filterExercises({
            targetMuscleGroupId: muscleGroupId,
            name,
            difficultyIds: difficultyIds,
            equipmentIds: equipmentIds,
            bodyRegionIds: bodyRegionIds
        });
        setExercises(results);
    };

    useEffect(() => {
        getMuscleGroupId(muscleGroupName)
            .then(data => {
                setMuscleGroupId(data);
            })
    }, [muscleGroupName]);

    useEffect(() => {
        getDifficulties()
            .then(data => {
                const mp = {};

                const options = data.map(item => {
                    mp[item.id] = item.name;
        
                    return {
                        value: item.id.toString(),
                        label: item.name
                    };
                });

                setDifficultyOptions(options);

                setDifficultyMap(mp);
            })
        
        getEquipment()
            .then(data => {
                const mp = {};

                const options = data.map(item => {
                    mp[item.id] = item.name;
        
                    return {
                        value: item.id.toString(),
                        label: item.name
                    };
                });

                setEquipmentOptions(options);

                setEquipmentMap(mp);
            })
    }, []);

    useEffect(() => {
        if (muscleGroupId !== null) {
            filterExercises({
                targetMuscleGroupId: muscleGroupId,
                name: "",
                difficultyIds: [],
                equipmentIds: [],
                bodyRegionIds: []
            })
                .then(data => {
                    setExercises(data);
                });

            getBodyRegionsForMuscleGroup(muscleGroupId)
                .then(data => {
                    const mp = {};

                    const options = data.map(item => {
                        mp[item.id] = item.name;
            
                        return {
                            value: item.id.toString(),
                            label: item.name
                        };
                    });

                    setBodyRegionOptions(options);

                    setBodyRegionMap(mp);
                });
        };
    }, [muscleGroupId])

    return (
        <Container className="muscle-group-page d-flex flex-column">
            <Row className="mb-4">
                <Col>
                    <FormControl
                        placeholder="Exercise Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Col>
                <Col>
                    <Select
                        placeholder="Difficulty"
                        options={difficultyOptions}
                        value={difficulty}
                        onChange={(selectedOptions) => setDifficulty(selectedOptions || [])}
                        isMulti
                    />
                </Col>
                <Col>
                    <Select
                        placeholder="Equipment"
                        options={equipmentOptions}
                        value={equipment}
                        onChange={(selectedOptions) => setEquipment(selectedOptions || [])}
                        isMulti
                    />
                </Col>
                <Col>
                    <Select
                        placeholder="Body Region"
                        options={bodyRegionOptions}
                        value={bodyRegion}
                        onChange={(selectedOptions) => setBodyRegion(selectedOptions || [])}
                        isMulti
                    />
                </Col>
            </Row>
            <Button variant="primary" onClick={handleSearch}>
                Find Exercises
            </Button>

            {exercises.length > 0 && (
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Short Demonstration Link</th>
                            <th>In-Depth Demonstration Link</th>
                            <th>Difficulty</th>
                            {/* <th>Prime Mover Muscle ID</th>
                            <th>Secondary Mover Muscle ID</th>
                            <th>Tertiary Mover Muscle ID</th> */}
                            <th>Primary Equipment</th>
                            <th>Primary Items Number</th>
                            <th>Secondary Equipment</th>
                            <th>Secondary Items Number</th>
                            <th>Body Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise) => (
                            <tr key={exercise.id}>
                                <td>{exercise.name}</td>
                                <td>
                                    {exercise.short_demonstration_link ? (
                                        <a href={exercise.short_demonstration_link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                            Short Demo
                                        </a>
                                    ) : ''}
                                </td>
                                <td>
                                    {exercise.in_depth_demonstration_link ? (
                                        <a href={exercise.in_depth_demonstration_link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                            In-Depth Demo
                                        </a>
                                    ) : ''}
                                </td>
                                <td>{difficultyMap[exercise.difficulty_id]}</td>
                                {/* <td>{exercise.prime_mover_muscle_id}</td>
                                <td>{exercise.secondary_mover_muscle_id}</td>
                                <td>{exercise.tertiary_mover_muscle_id}</td> */}
                                <td>{equipmentMap[exercise.primary_equipment_id]}</td>
                                <td>
                                    {exercise.primary_items_number > 0 ? exercise.primary_items_number : ""}
                                </td>
                                <td>{equipmentMap[exercise.secondary_equipment_id]}</td>
                                <td>
                                    {exercise.secondary_items_number > 0 ? exercise.secondary_items_number : ""}
                                </td>
                                <td>{bodyRegionMap[exercise.body_region_id]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default MuscleGroupCatalog;
