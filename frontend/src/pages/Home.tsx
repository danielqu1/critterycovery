import React from 'react'; 
import ReactPlayer from 'react-player';
  
const Home = () => { 
  return ( 
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'Right', 
        alignItems: 'Right', 
        height: '100vh'
      }} 
    > 
      <div className='aspect16by9'>
        <div className='player-wrapper video'>
          <ReactPlayer
            className='react-player'
            url='https://www.youtube.com/watch?v=8rPB4A3zDnQ'
            playing={true}
            controls={false}
            config={{
              youtube: {
                playerVars: { autoplay: 1, showinfo: 1, disablekb: 1, fs: 0, iv_load_policy: 3, loop: 1, modestbranding: 1, rel: 0, pip: 0 }
              }
            }}
            muted={true}
            loop={true}
            width='100%'
            height='100%'
            //height='auto'
          />
        </div>

        <div>
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
