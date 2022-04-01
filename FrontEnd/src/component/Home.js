import React from "react";
import { Carousel,CarouselItem } from "react-bootstrap";
import { Card,CardGroup,Button} from "react-bootstrap";
/* import img from "../public/Homeimages/fiction.jpg"
import junglebook from "../public/Homeimages/Junglebook.jpg"
import cook from "../public/Homeimages/cook.png" */
import "../css/home.css";
import h1 from "../public/Homeimages/h1.jpg"
import h2 from "../public/Homeimages/homee1.jpg"
import h3 from "../public/Homeimages/home11.jpg"

import { bgcolor } from "@mui/system";
const Home=()=>{
    return (
        <div>
       
       {/* <center><h2>Some products</h2></center> */}

       <Carousel fade>
  <Carousel.Item>
  <Carousel.Caption>
  
    <font color="black"><h3>Buy best books from online</h3></font> 
     
      <p><Button variant="link">Purchase now</Button></p> 
      
    </Carousel.Caption>
    <img
      className="d-block w-100"
      src={h1}
      alt="First slide"
    />
   
  </Carousel.Item>
  <Carousel.Item>
  <Carousel.Caption>
  <font color="black"><h3>Buy best books from online</h3></font> 
      <p><Button variant="link">Purchase now</Button></p>
    </Carousel.Caption>
    <img
      className="d-block w-100"
      src={h2}
      alt="second slide"
    />
   
  </Carousel.Item>
  <Carousel.Item>
  <Carousel.Caption>
  <font color="black"> <h3>Buy best books from online</h3></font>
      <p><Button variant="link">Purchase now</Button></p> 
    </Carousel.Caption>
    <img
      className="d-block w-100"
      src={h3}
      alt="third slide"
    />
   
  </Carousel.Item>
</Carousel>




{/* 

<CardGroup>
        <Card style={{ width: '15rem' }}>
        <img src={img} className="card-img" alt="fiction book" height={300} width={150}/>
  <Card.Body>
    <Card.Title>This is fiction book</Card.Title>
    <Card.Text>
    Eleven-year-old Riley believes in the whispers,
     magical fairies that will grant you wishes
      if you leave them tributes. Riley has a lot of wishes. 
      He wishes bullies....
    </Card.Text>
    <Button variant="primary">Add to cart</Button>
    
  </Card.Body>
</Card>
<Card style={{ width: '15rem' }}>
<img src={junglebook} className="card-img" alt="fiction book" height={300} width={150}/>
  <Card.Body>
    <Card.Title>The Jungle book</Card.Title>
    <Card.Text>
    The Jungle Book by Rudyard Kipling is an adventure story about a man-cub named Mowgli.
     Mogli is hunted by an evil tiger named Shere Khan....
    </Card.Text>
    <Button variant="primary">Add to cart</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
<img src={cook} className="card-img" alt="fiction book" height={300} width={150}/>
  <Card.Body>
    <Card.Title>Cook book</Card.Title>
    <Card.Text>
    Real Food for Healthy People: A Recipe and Resource Guide for Whole Food Plant Based Cooking
Carol D'Anca integrative nutritionist and gourmet cook....
    </Card.Text>
    <Button variant="primary">Add to cart</Button>
  </Card.Body>
</Card>

</CardGroup> */}
        </div>

    )
}
export default Home;