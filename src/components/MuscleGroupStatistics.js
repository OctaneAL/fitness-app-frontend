import React from 'react';
import { Row, Col, Card, CardBody } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dataWorkouts = [
  { name: 'Chest', value: 10 },
  { name: 'Back', value: 15 },
  { name: 'Triceps', value: 8 },
  { name: 'Biceps', value: 5 },
  { name: 'Quadriceps', value: 12 },
  { name: 'Quadriceps1', value: 13 },
  { name: 'Quadriceps2', value: 14 },
  { name: 'Quadriceps3', value: 15 },
  { name: 'Quadriceps4', value: 16 },
];

const dataWeight = [
  { name: 'Chest', value: 400 },
  { name: 'Back', value: 600 },
  { name: 'Triceps', value: 300 },
  { name: 'Biceps', value: 150 },
  { name: 'Quadriceps', value: 200 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];

const MuscleGroupStatistics = ( { dataExercises, dataWeight} ) => (

    <Row>
        <Col xs={12} md={6} lg={6} className="mb-3">
            <Card>
                <CardBody>
                    <Card.Title className="text-center">Distribution of Exercises by Muscle Group</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={dataExercises}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                // label={({ name, value }) => `${name}: ${value}`}
                                innerRadius={72}
                                outerRadius={96}
                                paddingAngle={4}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {dataExercises.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </Col>
        <Col xs={12} md={6} lg={6} className="mb-3">
            <Card>
                <CardBody>
                    <Card.Title className="text-center">Distribution of weight lifted by Muscle group</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={dataWeight}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                // label={({ name, value }) => `${name}: ${value} kg`}
                                innerRadius={72}
                                outerRadius={96}
                                paddingAngle={6}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {dataWeight.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                formatter={(value) => `${value} kg`}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </Col>
    </Row>
);

export default MuscleGroupStatistics;
