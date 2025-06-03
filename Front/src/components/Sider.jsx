import { Button, CloseButton, Drawer, Portal,Table } from "@chakra-ui/react"
import { AiOutlineMenu } from "react-icons/ai";
import "./sider.css"
import { NavLink, useNavigate } from "react-router-dom";
const Demo = () => {
  const navigate = useNavigate();
  const logout = async ()=>{
    const response = await fetch(`https://client-dashboard-ruby.vercel.app/logout`,{
      method:"POST",
      credentials: 'include',
      headers:{
          "Content-Type":"application/json"
      },
      
  })
  const res = await response.json();
  if(res.message==='Logout'){
    navigate('/login');
  }

  }

  return (
    <Drawer.Root placement={"start"}>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
        <AiOutlineMenu/>
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              {/* <Drawer.Title>Menu</Drawer.Title> */}
            </Drawer.Header>
            <Drawer.Body>
              <div className="menuitems">
              <Table.Root size="sm">
            <Table.Header>
             <Table.Row>
            <Table.ColumnHeader></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        
          <Table.Row>
            <Table.Cell className="r1"><NavLink to="/mfd">Mutual Funds</NavLink></Table.Cell>
          </Table.Row>
          <Table.Row>
          <Table.Cell className="r1"><NavLink to="/corporateportfolio">Corporate Portfolio</NavLink></Table.Cell>
          </Table.Row>
          <Table.Row>
          <Table.Cell className="r1"><NavLink to="/dematportfolio">Demat Portfolio</NavLink></Table.Cell>
          </Table.Row>
          <Table.Row>
          <Table.Cell className="r1"><NavLink to="https://www.suigenerisconsulting.com/about_us.php" target="_blank">About US</NavLink></Table.Cell>
          </Table.Row>
        
      </Table.Body>
    </Table.Root>

              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="ghost" className="logout" onClick={logout}>Logout</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default Demo;