import React, { useEffect, useState } from "react";
import TrackCard from "../component/TrackCard";
import { useParams } from "react-router-dom";
import { config } from "../config/secret";

function Tracks(props){
    const [track,setTrack] = useState([])
    const [title, setTitle] = useState(false)
    const [url,setUrl] = useState(false)
    const [album,setAlbum] = useState("")
    let params = useParams()

    const readTrack = async () => {
        await fetch(`${config.url}/v1/artists/${params.id}/top-tracks?market=IN`,{
            mathod:"GET",
            headers: {
                Authorization: `${config.type} ${config.token}`
            }
        }).then(res => res.json())
        .then(res => {
            
            //store the artist info in state
            setTrack(res.tracks)
        }).catch(err => console.log(err.message))   
    }

    useEffect(() => {
        readTrack()
    },[])

    const clickHandler = (na, link,img) => {
        setTitle(na)
        setUrl(link)
        setAlbum(img)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-dark">
                        Tracks
                    </h3>
                </div>
            </div>

            <div className="row">
                {
                    track?.map((item,index) => {
                        return(
                            <TrackCard key={index} {...item}  cardClick={clickHandler}/>
                        )
                    })
                }
            </div>

             {/* modal */}
             <div className="modal fade" id="music" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title"> { title }</h6>
                            <button className="btn-close"  data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <img src={album ? album:""} alt="no pic"  className="card-img-top"/>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            {
                                url ? <audio src={url} controls></audio>:null
                            }
                        </div>
                    </div>
                </div>
             </div>
             {/* modal end here */}
        </div>
    )
}

export default Tracks