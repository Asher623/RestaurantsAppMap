import {useState, useEffect} from 'react';
import queryString from 'query-string';
import { useHistory } from "react-router-dom";
import { Card, Table, Pagination } from 'react-bootstrap';
export default function Restaurants(props){

  const [page, setPage] = useState(1);
  const [restaurants, setRestaurants] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  
  
  
  useEffect(()=>{
    var borough = queryString.parse(props.query).borough;
    setLoading(true);
    if (borough === undefined){
      fetch(`https://sleepy-shore-41358.herokuapp.com/api/restaurants?page=${page}&perPage=${10}`).then(response=> response.json()).then(restaurants=>{

        if(restaurants === undefined){
          setRestaurants(null)
        }else{
          setRestaurants(restaurants)
        }
        
      })
      setLoading(false);
      
    }else{

      const trueBorough = borough.charAt(0).toUpperCase() + borough.slice(1);
      fetch(`https://sleepy-shore-41358.herokuapp.com/api/restaurants?page=${page}&perPage=${10}&borough=${trueBorough}`).then(response=> response.json()).then(rests=>{
       
        if(rests[0] === undefined){
          setRestaurants(null)
        }else{     
          setRestaurants(rests)
        }
      })
      setLoading(false);
    }
  },[page, props.query])

  function previousPage(){
    if (page > 1){
      setPage(currentPage => currentPage - 1);
    }
  }

  function nextPage(){
    setPage(currentPage => currentPage + 1);
  }
  
  if(!loading){
    if(restaurants != null){
      return(
        <>
          <Card>
            <Card.Body><h2>Restaurant List</h2> <p>Full list of restaurants. Optionally sorted by borough </p></Card.Body>
          </Card>
          
          <Table striped bordered hover>
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {
                restaurants.map(restaurant=>(
                  <tr onClick={()=>{ history.push(`/restaurant/${restaurant._id}`)}} key={restaurant._id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.address.building} {restaurant.address.street}</td>
                    <td>{restaurant.borough}</td>
                    <td>{restaurant.cuisine}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
            <Pagination>
              
              <Pagination.Prev onClick={() => {previousPage()}}/>
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={() => {nextPage()}}/>
              
          </Pagination>
        </>
      );
    }else{
      return <p>No Restaurants Found</p>;
    }
  }else{
    return <p>Loading Restaurants...</p>;
  }
}
