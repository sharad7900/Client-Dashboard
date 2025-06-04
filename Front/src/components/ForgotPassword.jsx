import { Box, Button, Heading, Input, Spinner, Text, Toast, useToastStyles } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const ForgotPassword = () => {
  const [PAN, setPAN] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await PasswordReset(PAN);

      setPAN('');
    } catch (error) {

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt="12" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb="4">Forgot Password</Heading>
      <Text mb="6">Enter your PAN number to receive a password reset link.</Text>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>PAN Number</FormLabel>
          <Input
            type='text'
            placeholder="ABCDE0123F"
            value={PAN.trim().toUpperCase()}
            onChange={(e) => setPAN(e.target.value)}
          />
        </FormControl>

        <Button className='fbtn'
          type="submit"
          colorScheme="blue"
          isFullWidth
          isDisabled={!PAN || submitting}
          leftIcon={submitting && <Spinner size="sm" />}
        >
          {submitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </Box>
  );
};

const PasswordReset = async (PAN) =>{

  const response = await fetch(`https://client-dashboard-six-rho.vercel.app/forgotpassword`,{
        method:"POST",
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({PAN})
    })
  const res = await response.json();
  if(res.message==="Mail Sent"){
    toast.success(res.message);
  }
  else{
    toast.error(res.message)
  }
}

export default ForgotPassword;
