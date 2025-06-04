import { Box, Button, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSearchParams, Link } from 'react-router-dom';



const ResetPassword = () => {

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [pass, setpass] = useState('');
  const [confpass, setconfpass] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!pass || !confpass){
      toast.error("All fields are required!");
      setSubmitting(false);
      return;
    }
    if(pass.length<8){
      toast.error("Minimum Length is 8!");
      setSubmitting(false);
      return;
    }

    if(pass!==confpass){
      toast.error("Password must be same!");
      setSubmitting(false);
      return;
    }

    try {
      await PasswordReset(pass,confpass,token);
      setpass('');
      setconfpass('');
    } catch (error) {

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt="12" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb="4">Reset Password</Heading>
      <Text mb="6">Create your new password.</Text>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>pass address</FormLabel>
          <Input
            type="pass"
            placeholder="New Password"
            value={pass.trim()}
            onChange={(e) => setpass(e.target.value)}
          />
          <FormLabel>pass address</FormLabel>
          <Input
            type="pass"
            placeholder="Confirm Password"
            value={confpass.trim()}
            onChange={(e) => setconfpass(e.target.value)}
          />
        </FormControl>
        <Button className='rbtn'
          type="submit"
          colorScheme="blue"
          isFullWidth
          isDisabled={(!pass && !confpass) || submitting }
          leftIcon={submitting && <Spinner size="sm" />}
        >
          {submitting ? 'Sending...' : 'Create Password'}
        </Button>
      </form>
    </Box>
  );
};



const PasswordReset = async (pass,confpass,token) =>{

  const response = await fetch(`https://client-dashboard-six-rho.vercel.app/resetpassword`,{
        method:"POST",
        credentials: 'include',
        headers:{

            "Content-Type":"application/json"
        },
        body: JSON.stringify({pass,confpass,token})
    })
  const res = await response.json();
  
  if(res.message==="Password Updated Successfull\nRedirect to login..."){
    toast.success(res.message);
    setTimeout(() => {
  window.location.href = '/login';
}, 6000);
    
    
  }
  else{
    toast.error(res.message)
  }
}

export default ResetPassword;
