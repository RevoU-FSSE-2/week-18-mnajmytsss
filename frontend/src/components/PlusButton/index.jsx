/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const PlusButton = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      style={{
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        minWidth: '40px',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AddIcon />
    </Button>
  );
};

export default PlusButton;

