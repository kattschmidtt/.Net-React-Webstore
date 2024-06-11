import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import agent from '../../app/api/agent';
import { useState } from 'react';

const AboutPage = () => {

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationError = () => {
    agent.Errors.getValidationError()
      .then(() => console.log('should not see this'))
      .catch((err) => setValidationErrors(err))
  }

  return (
    <Container>
      <Typography gutterBottom variant='h2'>Errors for testing purposes</Typography>
      <ButtonGroup fullWidth>
        <Button 
          variant='contained' 
          onClick={() => agent.Errors.get400Error().catch(error => console.log(error))}>
            Test 400
        </Button>
        <Button 
          variant='contained' 
          onClick={() => agent.Errors.get401Error().catch(error => console.log(error))}>
            Test 401
        </Button>
        <Button 
          variant='contained' 
          onClick={() => agent.Errors.get404Error().catch(error => console.log(error))}>
            Test 404
        </Button>
        <Button 
          variant='contained' 
          onClick={() => agent.Errors.get500Error().catch(error => console.log(error))}>
            Test 500
          </Button>
        <Button 
          variant='contained' 
          onClick={getValidationError}>
            Test Validation
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && 
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map(err => (
              <ListItem key={err}>
                <ListItemText> {err} </ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      }
    </Container>
  );
};

export default AboutPage;