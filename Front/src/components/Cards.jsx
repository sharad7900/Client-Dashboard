import { Button, Card } from "@chakra-ui/react"
import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Cards = (props) => {
 

    const group = {
        MF:{
          Name:"Mututal Funds",
          url:"/mfd"
        },
        CP:{
          Name:"Corporate Portfolio",
          url:"/corporateportfolio"
        },
        DP:{
          Name:"Demat Portfolio",
          url:"/dematportfolio"
        },
    }
    const navigate = useNavigate();

    const handleClick = ()=>{
      navigate(group[props.name].url);
    }

  return (
    <Card.Root width="320px" style={{padding:"2%",margin:"2%"}}>
      <Card.Body gap="10">
        
        <Card.Title mt="2" fontSize={"x-large"}>{group[props.name].Name}</Card.Title>
        <Card.Description>
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button style={{padding:"2%"}} onClick={handleClick}>View<RiArrowRightLine /></Button>
      </Card.Footer>
    </Card.Root>
  )
}


export default Cards;