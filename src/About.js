import { Card } from 'react-bootstrap';

export default function About(){
    return (
        <>
            <Card >
                <Card.Header><h3>About</h3></Card.Header>
                <Card.Body>
                    <Card.Text >
                        All about me - the developer.
                        Hi everyone. I am Ivan and I am an international student from Russia and, hopefully, a future successful programmer.

                        I remember myself always being interested in computer studies and computer games as well.  Starting from infant school
                        I have always spent most of my free time gaming. And it was not only fun, but it helped me to find lots of friends and
                        make connections as well. Not to mention that gaming has also developed a variety of useful skills in me. I can even sometimes 
                        understand the kind of a person I am talking to by just knowing what games he is playing.
                        
                        <p>My project: <a href="https://shrouded-atoll-45618.herokuapp.com"> Papa Jones</a></p>
                        
                        
                    </Card.Text>
                  </Card.Body>
            </Card>
            <br></br>
        </>
    )
}
