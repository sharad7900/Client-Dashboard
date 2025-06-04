import { Button, CloseButton, Drawer, Field, Input, NativeSelect, NumberInput, Portal } from "@chakra-ui/react"
import { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';


const AddTask =(DB_ID)=>{
    const [load,setLoad] = useState(false);
    const [values,setValue] = useState({
        Task_Name: "",
        Due_Date: new Date(),
        Priority: "",
        Frequency: "",
    
    })

   const handleClick = async()=>{
    if(values.Task_Name.length===0){
      toast.error("Task Name Required");
      return;
    }
    setLoad(!load);
    const response = await fetch(`https://client-dashboard-six-rho.vercel.app/createTask`,{
            method:"POST",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({Task_Name: values.Task_Name,
  Due_Date: values.Due_Date,
  Frequency: values.Frequency,
  Priority: values.Priority,
  db_id: DB_ID.DB_ID
})
            
        })
      if(response.ok){
        setLoad(false);
        toast.success("Task Added Successfull");
        setTimeout(()=>{location.reload();},2000);
        
        return;
      }
     else{
      setLoad(false);
      toast.error("Something went wrong!");
     }
    
   }

    return(<>
    
    <div style={{display:"flex",justifyContent:"center", position:'sticky', bottom:"10px"}}>
    <Drawer.Root placement={"bottom"} >
      <Drawer.Trigger asChild>
        <Button variant="outline" size="xl" padding={'3'} background={"green"} style={{border:"2px solid white", fontSize:"larger"}}>
          Add Task
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content style={{padding:"1%"}}>
            <Drawer.Body>
            <div style={{display:"flex", justifyContent:"space-evenly", padding:"1% 1% 2% 1%"}}>
            <Input placeholder="Task Name" style={{width:"15%"}} onChange={(e)=>setValue(prev => ({...prev,Task_Name: e.target.value}))}/>
            <DatePicker placeholderText="Due Date" selected={values.Due_Date} onChange={(date)=>setValue(prev=>({...prev,Due_Date:date}))}/>
             <NativeSelect.Root size="md" width="240px">
             <NativeSelect.Field placeholder="Select Priority" padding={'1.5'} onChange={(e)=>setValue(prev=>({...prev,Priority: e.target.value}))}>
             <option value="Low">Low</option>
             <option value="Medium">Medium</option>
             <option value="High">High</option>
           </NativeSelect.Field>
           <NativeSelect.Indicator />
         </NativeSelect.Root>
      <NativeSelect.Root size="md" width="150px">
             <NativeSelect.Field placeholder="Select Frequency" padding={'1.5'} onChange={(e)=>setValue(prev=>({...prev,Frequency: e.target.value}))}>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
             <option value="9">9</option>
             <option value="10">10</option>
             <option value="11">11</option>
             <option value="12">12</option>
           </NativeSelect.Field>
           <NativeSelect.Indicator />
         </NativeSelect.Root>
         
   
            </div>
            </Drawer.Body>
            <Drawer.Footer style={{display:"flex", justifyContent:"center"}}>
              <Button style={{padding:"3px 10px 3px 10px"}} onClick={()=>handleClick()} loading={load}>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="xl" style={{background:"white", color:"black"}}/>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
    </div>
    </>)
}

export default AddTask;
