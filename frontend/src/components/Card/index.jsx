/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PlusButton from '../PlusButton';
import CardList from '../CardList';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const CardTask = ({ title, children }) => {
  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('');

  const handleOpenModal = (cardId) => {
    setOpenModal(true);
    setCardId(cardId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewTask('');
    setPriority('medium');
    setCardId(null);
  };

  const handleAddTaskAndCard = () => {
    const newCardId = Date.now();
  
    setCards((prevCards) => [
      ...prevCards,
      {
        id: newCardId,
        title: newTask,
        priority: priority,
      },
    ]);
    console.log(priority)
  
    handleCloseModal();
  };
  
  return (
    <Card
      sx={{
        minWidth: 275,
        margin: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <div>
        <Typography variant="h6">{title}</Typography>
        {children}
      </div>
      <PlusButton onClick={handleOpenModal} />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6">Add New Task</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority-select"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleAddTaskAndCard} sx={{ mt: 2 }}>
            Add Task
          </Button>
        </Box>
      </Modal>

      {cards.map((card) => (
  <CardList key={card.id} title={card.title} priority={card.priority} />
))}
    </Card>
  );
};

export default CardTask;

