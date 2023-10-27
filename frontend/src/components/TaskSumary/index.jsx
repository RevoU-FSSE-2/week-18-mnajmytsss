/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardSummary = ({ tasks = [] }) => {
  const [lastTask, setLastTask] = useState(null);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setLastTask(tasks[tasks.length - 1]);
    }
  }, [tasks]);

  return (
    <Card sx={{ minWidth: 275, margin: '10px' }}>
      <CardContent>
        <Typography variant="h6">Task Summary</Typography>
        <Typography variant="body2">Number of Tasks: {tasks.length}</Typography>
        {lastTask && (
          <>
            <Typography variant="body2">Last Task Title: {lastTask.text}</Typography>
            <Typography variant="body2">
              Last Task Created At: {new Date(lastTask.id).toLocaleString()}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CardSummary;
