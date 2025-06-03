import React, { useEffect, useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Flex, Spinner } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChatPage =  () => {
    const location = useLocation();
  const {id} = location.state || {};
  const [response,setResponse] = useState();
  useEffect(()=>{
   const fetching = async() =>{
    const temp = await fetch(`http://localhost:5000/comments`,{
        method:"POST",
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id})
    })
    const res = await temp.json();
    if(!temp.ok){
              window.location.href = '/login'
              return;
            }
    setResponse(res);

   }
   fetching();
  },[]);

  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim().length === 0) return;
    if(input.length!==0){
    const response2 = fetch(`http://localhost:5000/create_comment`,{
        method:"POST",
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({"id":id,"cmt":input})
    })
    setResponse(prevItems => [...prevItems, {prsn:"user",data:input}]);
    setInput('');
    await toast.promise( response2,
      {
        pending: 'Sending...',
        success: 'Message sent!',
        error: 'Failed to send message',
      })
    }
 
  };

  return (<>
    {response!==undefined ?
    <Flex direction="column" p={4} maxW="2xl" mx="auto" h="100vh">
      <Box flex="1" overflowY="auto" p={4} mb={4} borderWidth={1} borderRadius="lg">
        <VStack spacing={4} align="stretch">
          {response.map((msg, index) => (
            <Box
              key={index}
              alignSelf={msg.prsn === 'user' ? 'flex-end' : 'flex-start'}
              bg={msg.prsn === 'user' ? 'blue.500' : 'gray.500'}
              p={2}
              borderRadius="lg"
              maxW="70%"
            >
              <Text fontSize="sm">{msg.data}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <HStack>
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage} colorScheme="blue">Send</Button>
      </HStack>
    </Flex>
     : <div  className="loading"><Spinner size="xl"/></div>}
       </>
  );

};

export default ChatPage;
