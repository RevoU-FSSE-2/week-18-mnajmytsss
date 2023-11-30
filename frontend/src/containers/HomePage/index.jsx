
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './index.css'
import CustomButton from '../../components/Button';
import { API_BASE_URL, getHeaders, fetchLists, showAlert } from '../../function'

const CombinedComponent = () => {
  const [cards, setCards] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState(null);
  
  useEffect(() => {
    fetchLists(setCards);
    console.log(cards)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseModal = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setNewTask('');
    setPriority('');
    setStatus('');
  };

  const handleAddTaskAndCard = async () => {
    const newCardId = Date.now();
    const date = new Date(newCardId).toLocaleString();

    const newCard = {
      id: newCardId,
      title: newTask,
      priority: priority,
      status: status,
      createdAt: date,
      dueDate: dueDate, 
      tasks: [
        { id: Date.now(), text: newTask, priority, status, completed: false, dueDate },
      ],
      numberOfTasks: 1,
      lastTaskTitle: newTask,
      lastTaskCreatedAt: date,
    };
    console.log(newCard)
    console.log(newTask)

    setCards((prevCards) => [...prevCards, newCard]);
    handleCloseModal();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/lists`, {
        title: newCard.title,
        priority: newCard.priority,
        status: typeof newCard.status === 'string' ? newCard.status.toLowerCase() : newCard.status,
        dueDate: newCard.dueDate, 
      }, getHeaders());
      showAlert('success', 'Task Successfully Added', '')
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating list:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (cardId) => {
    const index = cards.findIndex((card) => card.id === cardId);
  
    if (index !== -1) {
      const cardToEdit = cards[index];
      setNewTask(cardToEdit.title);
      setPriority(cardToEdit.priority);
      setStatus(cardToEdit.status);
      setEditingIndex(index);
      setOpenEditModal(true);
    } else {
      console.error(`Card with id ${cardId} not found.`);
    }
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setEditingIndex(null);
    setNewTask('');
    setPriority('');
    setStatus('');
  };

  const handleEditSubmit = async () => {
    if (editingIndex !== null) {
      const editedCard = { ...cards[editingIndex] };
      editedCard.title = newTask;
      editedCard.priority = priority;
      editedCard.status = status;
  
      const updatedCards = [...cards];
      updatedCards[editingIndex] = editedCard;
      setCards(updatedCards);
  
      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/v1/lists/${editedCard.id}`,
          {
            list: editedCard.title,
            priority: editedCard.priority,
            status: typeof editedCard.status === 'string' ? editedCard.status.toLowerCase() : editedCard.status,
          },
          getHeaders()
        );
        showAlert('success', 'Task Successfully Edited', '')
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error updating task:', error.response ? error.response.data : error.message);
      }
  
      handleEditModalClose();
    } 
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => (name === 'newTask' ? value : prevTask));
    setPriority((prevPriority) => (name === 'priority' ? value : prevPriority));
    setStatus((prevStatus) => (name === 'status' ? value : prevStatus));

    if (name === 'dueDate') {
      setDueDate(value);
    }
  };

  const handleDeleteTask = async (cardId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/v1/lists/${cardId}`, getHeaders());
      console.log('Response:', response.data);

      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      showAlert('success', 'Task Successfully Deleted', '')
    } catch (error) {
      console.error('Error deleting card:', error.response ? error.response.data : error.message);
    }
  };
  
  
  
  const todoTasks = cards.filter((card) => card.status === 'to do');
  const inProgressTasks = cards.filter((card) => card.status === 'on progress');
  const doneTasks = cards.filter((card) => card.status === 'done');

  return (
    <div className='homePage'>
    <div className='topSurface'>
        <CustomButton onClick={handleOpenAddModal}
        sx={{
            minWidth: 275,
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            flexGrow: '1',
            height: '80px'
        }}
        >Add your task</CustomButton>
        <Modal open={openAddModal} onClose={handleCloseModal}>
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
              autoCapitalize="none"
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
                <MenuItem value="high">high</MenuItem>
                <MenuItem value="medium">medium</MenuItem>
                <MenuItem value="low">low</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="to do">to do</MenuItem>
                  <MenuItem value="on progress">on progress</MenuItem>
                  <MenuItem value="done">done</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id="dueDate"
                label="Due Date"
                type="date"
                value={dueDate}
                autoCapitalize="none"
                onChange={(e) => handleInputChange({ target: { name: 'dueDate', value: e.target.value } })}
                sx={{ mt: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}/>
            <Button onClick={handleAddTaskAndCard} sx={{ mt: 2 }}>
              Add Task
            </Button>
          </Box>
        </Modal>
        <Modal open={openEditModal} onClose={handleEditModalClose}>
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
        <Typography variant="h6">Edit Task</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Task"
          fullWidth
          name="newTask"
          value={newTask}
          onChange={handleInputChange}
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
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="to do">To Do</MenuItem>
            <MenuItem value="on progress">On Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleEditSubmit} sx={{ mt: 2 }}>
            Save Changes
          </Button>
      </Box>
    </Modal>
   
      <Card 
        sx={{
          minWidth: 275,
          margin: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          flexGrow: '4',
          height: '80px'
        }}>
        <CardContent>
            <Typography variant="h3">HEHE</Typography>
          </CardContent>
      </Card>
      <Card sx={{
          minWidth: 275,
          margin: '10px',
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          flexGrow: '2',
          height: '80px'
        }}>
    <CardContent>
        <Typography variant="h6">Task Summary</Typography>
        <Typography variant="body2">Number of Tasks: {cards.length}</Typography>
        {cards.length > 0 && (
        <>
            <Typography variant="body2">Last Task Title: {cards[cards.length - 1].title}</Typography>
            <Typography variant="body2">Last Task Created At: {cards[cards.length - 1].date}</Typography>
        </>
        )}
    </CardContent>
    </Card>
      </div>
      <div className='bottomSurface'>
      <Card className='card' sx={{ minWidth: 285, margin: '10px', flexGrow: '2' }} title>
        <CardContent sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: '10px'}}>
          <Typography variant="p" sx={{fontSize: '15px', borderBox: '1px'}}>to do</Typography>
          <br />
          {todoTasks.map((card) => (
            <Card className='biji' key={card.id} sx={{ minWidth: 285, margin: '10px', flexGrow: '2', color: 'white' }}>
              <CardContent className='cardLists'>
                <Typography variant="p">Task : {card.title}</Typography>
                <Typography variant="p" value={priority} onChange={(e) => setPriority(e.target.value)}>Status : {card.status}</Typography>
                <Typography variant="p" value={status} onChange={(e) => setPriority(e.target.value)}>Priority : {card.priority}</Typography>
                {card.dueDate && (
                  <Typography variant="p">Due Date: {card.dueDate}</Typography>
                )}
                <Typography variant="p" >Created at : {card.date}</Typography>
              </CardContent>
              <div className='EEtButton'>
                <Button variant='soft' onClick={() => handleEdit(card.id)}>Edit</Button>
                <Button variant='soft' onClick={() => handleDeleteTask(card.id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card className='card' sx={{ minWidth: 285, margin: '10px', flexGrow: '2' }} title>
        <CardContent sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: '10px'}}>
          <Typography variant="p" sx={{fontSize: '15px', borderBox: '1px'}} >On Progress</Typography>
          <br />
          <div className='huntu'>
            {inProgressTasks.map((card) => (
              <Card className='biji' key={card.id} sx={{ minWidth: 285, margin: '10px', flexGrow: '2', color: 'white' }}>
                <CardContent className='cardLists'>
                  <Typography variant="p">Task : {card.title}</Typography>
                  <Typography variant="p" value={priority} onChange={(e) => setPriority(e.target.value)}>Status : {card.status}</Typography>
                  <Typography variant="p" value={status} onChange={(e) => setPriority(e.target.value)}>Priority : {card.priority}</Typography>
                  {card.dueDate && (
                    <Typography variant="p">Due Date: {card.dueDate}</Typography>
                  )}
                  <Typography variant="p" >Created at : {card.date}</Typography>
                </CardContent>
                <div className='EEtButton'>
                  <Button variant='soft' onClick={() => handleEdit(card.id)}>Edit</Button>
                  <Button variant='soft' onClick={() => handleDeleteTask(card.id)}>Delete</Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
        <Card className='card' sx={{ minWidth: 285, margin: '10px', flexGrow: '2' }} title>
        <CardContent sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: '10px'}}>
          <Typography variant="p" sx={{fontSize: '15px', borderBox: '1px'}} >Done</Typography>
          <br />
          {doneTasks.map((card) => (
            <Card className='biji' key={card.id} sx={{ minWidth: 285, margin: '10px', flexGrow: '2', color: 'white' }}>
              <CardContent className='cardLists'>
                <Typography variant="p">Task : {card.title}</Typography>
                <Typography variant="p" value={priority} onChange={(e) => setPriority(e.target.value)}>Status : {card.status}</Typography>
                <Typography variant="p" value={status} onChange={(e) => setPriority(e.target.value)}>Priority : {card.priority}</Typography>
                {card.dueDate && (
                  <Typography variant="p">Due Date: {card.dueDate}</Typography>
                )}
                <Typography variant="p" >Created at : {card.date}</Typography>
              </CardContent>
              <div className='EEtButton'>
                <Button variant='soft' onClick={() => handleEdit(card.id)}>Edit</Button>
                <Button variant='soft' onClick={() => handleDeleteTask(card.id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default CombinedComponent;