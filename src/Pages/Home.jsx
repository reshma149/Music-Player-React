import React, { useState } from "react";
import Search from "../component/Search";
import  {config} from "../config/secret";
import ArtistCard from "../component/ArtistCard";

function Home(props){

    const [artist, setArtist] = useState(false)

    const searchHandler = async (name) => {  
        console.log(`artist name=`,name)  
        await fetch(`${config.url}/v1/search?q=${name}&type=artist&limit=1`,{
            mathod:"GET",
            headers: {
                Authorization: `${config.type} ${config.token}`
            }
        }).then(res => res.json())
        .then(res => {
            console.log(`artist = `, res)
            //store the artist info in state
            setArtist(res?.artists?.items[0])
        }).catch(err => console.log(err.message))    
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-dark">
                        Home
                    </h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <Search  readArtist={searchHandler}/>
                </div>
            </div>

            <ArtistCard {...artist} />
        </div>
    )
}

export default Home;