import React from 'react';
import { Row, Col, Card, CardBody } from 'react-bootstrap';
import {
  PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

// const sampleDifficultyData = [
//   { name: 'Beginner', value: 40 },
//   { name: 'Intermediate', value: 30 },
//   { name: 'Advanced', value: 20 },
//   { name: 'Expert', value: 10 }
// ];

const progressData = [
  { name: 'Week 1', Beginner: 10, Intermediate: 5, Advanced: 2, Expert: 1 },
  { name: 'Week 2', Beginner: 8, Intermediate: 6, Advanced: 3, Expert: 1 },
  { name: 'Week 3', Beginner: 6, Intermediate: 7, Advanced: 4, Expert: 2 },
  { name: 'Week 4', Beginner: 4, Intermediate: 8, Advanced: 5, Expert: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DifficultyStatistics = ( { difficultyData }) => {
    return (
        <Row> {/* className="mb-4" */}
            <Col xs={12} md={6} lg={6} className="mb-3">
                <Card>
                    <CardBody>
                        <Card.Title className="text-center">Distribution of Exercises by Difficulty Level</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={difficultyData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {difficultyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value, name, entry) => {
                                        const total = difficultyData.reduce((acc, item) => acc + item.value, 0);
                                        const percent = ((entry.value / total) * 100).toFixed(0);
                                        return [`${percent}%`, entry.name];
                                    }}
                                />
                            <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={12} md={6} lg={6} className="mb-3">
                <Card>
                    <CardBody>
                        <Card.Title className="text-center">Progress in Moving from Easier to Harder Exercises</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={progressData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Beginner" stroke="#0088FE" />
                                <Line type="monotone" dataKey="Intermediate" stroke="#00C49F" />
                                <Line type="monotone" dataKey="Advanced" stroke="#FFBB28" />
                                <Line type="monotone" dataKey="Expert" stroke="#FF8042" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default DifficultyStatistics;
