import React from 'react'; 
import ReactPlayer from 'react-player';

const Home = () => { 
  return ( 
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'Right', 
        alignItems: 'Right', 
        height: '90vh'
        
      }} 
    > 
      <div>
        <div className='home-video' style={{width:'100vw', height:'calc(100vw * .5625)', zIndex:10}}>.</div>
        <div className='player-wrapper home-video'>
          <ReactPlayer
            className='react-player'
            url={'https://www.youtu.be/8rPB4A3zDnQ?t='+ Math.floor(Math.random()*1200)}
            playing={true}
            controls={false}
            config={{
              youtube: {
                playerVars: { autoplay: 1, showinfo: 0, disablekb: 1, 
                              fs: 0, iv_load_policy: 3, loop: 1, 
                              modestbranding: 0, rel: 0, pip: 0, 
                              end: 1190}
              }
            }}
            muted={true}
            loop={true}
            width='100vw'
            height='calc(100vw * .5625)'
          />

          <div className='home-title'>
            <p className='font-big'> Critters need Recovery</p>
            <p className='font-medium-big'>If you love animals, you should support them</p>
          </div>
          <h1>Welcome to critterycovery</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, veritatis. Soluta pariatur nesciunt voluptatum id incidunt minus ratione obcaecati laborum unde? Voluptatibus officia quia ducimus odio labore atque aperiam sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolores provident animi deserunt maxime. Officiis explicabo odit vitae. Doloremque nemo nobis voluptates ducimus aperiam libero maiores accusamus earum ipsam voluptate! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea nostrum commodi et exercitationem, maiores eum facere dicta repellendus laborum voluptatibus amet ipsam animi repellat distinctio deleniti quis? Dicta, aperiam nobis.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, veritatis. Soluta pariatur nesciunt voluptatum id incidunt minus ratione obcaecati laborum unde? Voluptatibus officia quia ducimus odio labore atque aperiam sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolores provident animi deserunt maxime. Officiis explicabo odit vitae. Doloremque nemo nobis voluptates ducimus aperiam libero maiores accusamus earum ipsam voluptate! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea nostrum commodi et exercitationem, maiores eum facere dicta repellendus laborum voluptatibus amet ipsam animi repellat distinctio deleniti quis? Dicta, aperiam nobis.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, veritatis. Soluta pariatur nesciunt voluptatum id incidunt minus ratione obcaecati laborum unde? Voluptatibus officia quia ducimus odio labore atque aperiam sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolores provident animi deserunt maxime. Officiis explicabo odit vitae. Doloremque nemo nobis voluptates ducimus aperiam libero maiores accusamus earum ipsam voluptate! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea nostrum commodi et exercitationem, maiores eum facere dicta repellendus laborum voluptatibus amet ipsam animi repellat distinctio deleniti quis? Dicta, aperiam nobis.</p>
        </div>
      </div>
     
      
      
    </div> 
  ); 
}; 
  
export default Home;
