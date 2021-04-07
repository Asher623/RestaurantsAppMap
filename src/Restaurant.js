import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {useState, useEffect} from 'react';
import { Card, CardDeck } from 'react-bootstrap';


export default function Restaurant(props){
  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);

    fetch(`https://sleepy-shore-41358.herokuapp.com/api/restaurants/${props.id}`).then(response=> response.json()).then(rest=>{
        
        if(rest.hasOwnProperty("_id")){
          setRestaurant(rest)
        }else{
          setRestaurant(null)
        }
        console.log(rest);
      })
      setLoading(false);
  },[props.id])

  function convertDate(date){
    var fields = date.split('-');
    var year = fields[0];
    var month = fields[1];
    var day = fields[2].slice(0,2);
    return month + "/" + day + "/" + year;
  }
  if(!loading){
    if(restaurant){
      return(
        <>
          <Card >
            <Card.Header><h3>{restaurant.name}</h3> <p>{restaurant.address.building} {restaurant.address.street}</p></Card.Header>
          </Card>
          <br></br>
          <MapContainer  style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
           </MapContainer>
           <br></br>
           <h3>Ratings</h3>
           <hr></hr>
          <CardDeck >
            {
              restaurant.grades.map((rest, index)=>(
                <Card key = {index}>
                  <Card.Header >Grade: {rest.grade}</Card.Header>
                  <Card.Body>
                    <Card.Text >
                      Completed: {convertDate(rest.date)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            }
          </CardDeck>
        </>
      );
    }
    else{
      return <p>Unable to find Restaurant with id: {props.id}</p>;
    }
  }else{ 
    return <p>Loading Restaurant Data...</p>; 
  }
  
}
