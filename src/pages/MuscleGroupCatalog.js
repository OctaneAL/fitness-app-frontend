import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Table, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
    filterExercises, getDifficulties, getEquipment,
    getBodyRegionsForMuscleGroup, getMuscleGroupId,
    getFavoriteExercises, addFavoriteExercise, deleteFavoriteExercise
} from '../services/api'; // Import your filtering function
import Select from 'react-select';
import { useAuth } from '../services/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

function MuscleGroupCatalog() {
    const { user_id } = useAuth();

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

    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        if (typeof user_id !== "string"){
            getFavoriteExercises(user_id)
                .then(data => {
                    setFavorites(new Set(data.map(exercise => exercise)));
                });
        }
    }, [user_id]);

    const toggleFavorite = async (exerciseId) => {
        exerciseId = parseInt(exerciseId);

        if (favorites.has(exerciseId)) {
            deleteFavoriteExercise(user_id, exerciseId);
            setFavorites(prev => {
                const updated = new Set(prev);
                updated.delete(parseInt(exerciseId));
                return updated;
            });
        } else {
            addFavoriteExercise(user_id, exerciseId);
            setFavorites(prev => new Set(prev).add(exerciseId));
        }
    };

    const [containerHeight, setContainerHeight] = useState('auto');
    const containerRef = useRef(null);

    // Calculate height of the table component. So it doesnt exceed screen height
    useEffect(() => {
        const updateContainerHeight = () => {
            if (containerRef.current) {
                const viewportHeight = window.innerHeight;
                const offsetTop = containerRef.current.getBoundingClientRect().top;
                const newHeight = viewportHeight - offsetTop - 20;
                setContainerHeight(`${newHeight}px`);
            }
        };
    
        const handleResize = () => {
            requestAnimationFrame(updateContainerHeight);
        };
    
        const intervalId = setInterval(() => {
            if (containerRef.current) {
                updateContainerHeight();
                clearInterval(intervalId);
            }
        }, 100);
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Container className="muscle-group-page d-flex flex-column">
            <Row className="mt-4">
                <Col xs={12} md={6} lg={6} className="d-flex flex-column align-items-center justify-content-center mb-4">
                    <FormControl
                        placeholder="Exercise Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Col>
                <Col xs={12} md={6} lg={6}  className="d-flex flex-column align-items-center justify-content-center mb-4">
                    <Select
                        placeholder="Difficulty"
                        options={difficultyOptions}
                        value={difficulty}
                        className="w-100"
                        onChange={(selectedOptions) => setDifficulty(selectedOptions || [])}
                        isMulti
                    />
                </Col>
                <Col xs={12} md={6} lg={6} className="d-flex flex-column align-items-center justify-content-center mb-4">
                    <Select
                        placeholder="Equipment"
                        options={equipmentOptions}
                        value={equipment}
                        className="w-100"
                        onChange={(selectedOptions) => setEquipment(selectedOptions || [])}
                        isMulti
                    />
                </Col>
                <Col xs={12} md={6} lg={6} className="d-flex flex-column align-items-center justify-content-center mb-4">
                    <Select
                        placeholder="Body Region"
                        options={bodyRegionOptions}
                        value={bodyRegion}
                        className="w-100"
                        onChange={(selectedOptions) => setBodyRegion(selectedOptions || [])}
                        isMulti
                    />
                </Col>
            </Row>
            <Button variant="primary" onClick={handleSearch}>
                Find Exercises
            </Button>

            {exercises.length > 0 && (
                <div
                    ref={containerRef}
                    style={{ minHeight: '400px', maxHeight: containerHeight, overflowY: 'auto', overflowX: 'auto' }}
                >
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th></th>
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
                                <td className="text-center align-middle">
                                    <FontAwesomeIcon
                                        icon={favorites.has(parseInt(exercise.id)) ? faSolidHeart : faRegularHeart}
                                        size="2x"
                                        className="text-primary"
                                        onClick={() => toggleFavorite(exercise.id)}
                                    />
                                </td>
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
                </div>
            )}
        </Container>
    );
}

export default MuscleGroupCatalog;
