import React from 'react'; 
import ReactPlayer from 'react-player';
import {Container, CardDeck} from 'react-bootstrap'
import ModelCard from '../../components/Cards/ModelCard'

const Home = () => { 

  type Models = {
    href: string,
    title: string,
    image: string,
    text: string
  }

  let model: Models[] = [
    { href: "/species",
      title: "Species",
      image: "https://i.imgur.com/dyN72lq.png",
      text: "Click here to go to species"
    },
    { href: "/habitats",
      title: "Habitats",
      image: "https://i.imgur.com/bU8w49l.jpg",
      text: "Click here to go to habitats"
    },
    { href: "/countries",
      title: "Countries",
      image: "https://i.imgur.com/o1e9atI.jpeg",
      text: "Click here to go to countries"
    },

  ];
  return (

    <body className='body' style={{position:'relative', alignContent:'left'}}>
      <Container fluid style={{padding:'0px'}}>
        <div className='home-video' style={{width:'100vw', height:'calc(100vw * .5625)', zIndex:9}}></div>
        <div className='player-wrapper' style={{overflowX:'hidden', overflowY:'hidden'}}>
          <ReactPlayer
            className='react-player'
            url={'https://www.youtu.be/8rPB4A3zDnQ?t='+ Math.floor(Math.random()*1200)}
            playing={true}
            controls={false}
            config={{
              youtube: {
                playerVars: { autoplay: 1, showinfo: 0, disablekb: 1, 
                              fs: 0, iv_load_policy: 3, loop: 1, 
                              modestbranding: 1, rel: 0, pip: 0, 
                              end: 1190}
              }
            }}
            muted={true}
            loop={true}
            width='100vw'
            height='calc(100vw * .5625)'
          />
        </div>
        <div className='home-title'>
          <p className='font-big'> Critters need Recovery</p>
          <p className='font-medium-big'>If you love animals, you should support them</p>
        </div>
      </Container>
      
      <Container fluid='md' style={{alignContent:'center', top: '100vh'}}>
        <CardDeck>
            <ModelCard models={model[0]}></ModelCard>
            <ModelCard models={model[1]}></ModelCard>
            <ModelCard models={model[2]}></ModelCard>
        </CardDeck>
      </Container>
          
    </body>
  ); 
}; 
  
export default Home;
