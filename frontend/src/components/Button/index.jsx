/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';

const CustomButton = ({ children, sx, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        backgroundImage: 'linear-gradient(to right, #266a96, #8e44ad)',
        marginLeft: 'auto',
        width: '200px',
        fontSize: '1.7rem',
        ...sx,
      }}
      variant="contained"
    >
      {children}
    </Button>
  );
};


export default CustomButton;