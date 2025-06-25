import { useEffect, useState } from "react";
import Demo from "./Sider";
import "./MFD.css" 
import { Badge, Button, NativeSelect, Spinner, Table } from "@chakra-ui/react";
import { RiArrowRightLine} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";


function MFD(){
   const [val,setVal] = useState();
   const [filterval,setFilterval] = useState([]);
   useEffect(()=>{
    const data = async()=>{
        const response = await fetch(`https://client-dashboard-six-rho.vercel.app/mfd`,{
            method:"GET",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json",
            },
    
            
        })
        const res = await response.json();
        if(!response.ok){
              window.location.href = '/login'
              return;
            }
        setVal(res);
        setFilterval(res);
           
       }
      data();

   },[])
   
    const navigate = useNavigate();
   
   const handleClick = (ids)=>{
   navigate('/chatpage', {
      state: { id: ids }
    });
    const handleDiscription = (ids)=>{
     console.log(ids);
     navigate('/descriptions', {
      state: { id: ids }
    });

   }

   }

    return(<>
    <div className="menu"><Demo/></div>
{val ? <div className="tableData">

  <div className="filter-btn"><NativeSelect.Root size="sm" width="140px">
      <NativeSelect.Field placeholder="Select Status" padding={"1"} onChange={(e) => {
  const selected = e.target.value;
  if (!selected || selected === null) {
    setFilterval(val); 
  } else {
    const filtered = val.filter(item => item.Status === selected);
    setFilterval(filtered);
  }
}}>
        <option value="Not started">Not started</option>
        <option value="In progress">In progress</option>
        <option value="Done">Done</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
    </div>

<Table.Root size="sm" className="task-table">

  <Table.Header className="header">
    <Table.Row>
      <Table.ColumnHeader className="header">Name</Table.ColumnHeader>
      <Table.ColumnHeader className="header">Status</Table.ColumnHeader>
      <Table.ColumnHeader className="header">Assignee</Table.ColumnHeader>
      <Table.ColumnHeader className="header">Due</Table.ColumnHeader>
      <Table.ColumnHeader className="header">Frequency</Table.ColumnHeader>
      <Table.ColumnHeader className="header">Days Left</Table.ColumnHeader>
      <Table.ColumnHeader className="header">Comments</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {filterval.map((item,index) => (
      <Table.Row key={index} onClick={()=>handleDiscription(item.id)} style={{cursor:"pointer"}}>
        <Table.Cell className="rows">{item.Name}</Table.Cell>
        <Table.Cell className="rows">{item.Status==="Done" ? <Badge colorPalette="green" className="status">Done</Badge> : item.Status==="In progress" ? <Badge colorPalette="blue" className="status">In progress</Badge> : <Badge colorPalette="gray" className="status">Not Started</Badge>}</Table.Cell>
        <Table.Cell className="rows">{item.Assignee}</Table.Cell>
        <Table.Cell className="rows">{item.Due.slice(0,10)}</Table.Cell>
        <Table.Cell className="rows" style={{textAlign:"center"}}>{item.Frequency}</Table.Cell>
        <Table.Cell className="rows">{item.Days_Left}</Table.Cell>
        <Table.Cell className="rows"><Button colorPalette="teal" variant="outline" className="cmtbtn" onClick={()=>handleClick(item.id)}>
        Comments <RiArrowRightLine />
      </Button></Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table.Root>
<br />
<AddTask DB_ID = {"MFD"}/>







</div> : <div  className="loading"><Spinner size="xl"/></div>}
   
    </>)

}

export default MFD;

