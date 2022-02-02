import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ScrollAnimation from 'react-animate-on-scroll';
import Input from "@material-ui/core/Input";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import {FacebookShareButton, WhatsappShareButton} from 'react-share';
import {FacebookIcon, WhatsappIcon} from 'react-share';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import  Router  from "next/router";

var FileSaver = require('file-saver');

export default function Meme() {

    const [memes, setMemes] = useState([]);
    const [meme, setMeme] = useState(null);
    const [topText, setTopText] = useState("")
    const [bottomText, setBottomText] = useState("")
    const [Hidden, setHidden] = useState(true);
    const [Hidden1, setHidden1] = useState(false);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res => {
            res.json().then(res => {
                const _memes = res.data.memes;
                setMemes(_memes);
            })
        });
    }, [])

    function handleCreateMeme() {
        setHidden(false);
        setHidden1(true);
    }

    function download() {
        FileSaver.saveAs(meme.url, "image.jpg");
    }

    function handleClick() {
        Router.push("../login");
    }

    return (
        <>
        
            <div className="container-fluid vh-100 meme-page py-3">
                <span role="button" onClick={(e) => {handleClick()}}>
                <PowerSettingsNewIcon className="float-end" fontSize="large" />
                </span>
            
                {meme && Hidden &&
                    <>

                        <div className="row meme-row justify-content-center align-items-center text-center pt-5 mx-0">
                            <img className="meme" key={meme.id} alt={meme.name} src={meme.url} />
                            <h2 hidden={Hidden} className="top-h2">{topText}</h2>
                            <h2 hidden={Hidden} className="bottom-h2">{bottomText}</h2>
                        </div>
                        <div className="row justify-content-center align-items-center text-center mt-5 mx-0">
                            <form className='justify-content-center align-items-center text-center form' onSubmit={(e) => { e.preventDefault() }}>
                                <Input
                                    className='form-control mb-3 inputformat'
                                    hidden={Hidden1}
                                    placeholder='Top Caption'
                                    onChange={(e) => {
                                        setTopText(e.target.value)
                                    }}
                                />
                                <Input
                                    className='form-control mb-3 inputformat'
                                    hidden={Hidden1}
                                    placeholder='Bottom Caption'
                                    onChange={(e) => {
                                        setBottomText(e.target.value)
                                    }}
                                />
                                <button
                                    className='btn btn-primary btn-meme mt-2 mb-5 w-100'
                                    hidden={Hidden1}
                                    type='button'
                                    onClick={(e) => {
                                        handleCreateMeme();
                                    }}>
                                    Create Meme
                                </button>
                            </form>
                        </div>
                    </>
                }
                {!meme && memes.length ?
                    <div className="container-fluid p-lg-5 p-md-4 p-sm-3 p-1 vh-100">
                        <h1 className="text-center mb-5 mt-sm-0 mt-3">Choose a Meme</h1>
                        <div className="row meme-row-dashboard justify-content-center text-center">
                            {
                                memes.map((meme) => {
                                    return (
                                        <>
                                            <div className="col-lg-3 col-md-4 col-6">
                                                <img className="meme-img hover-overlay hover-zoom hover-shadow ripple" key={meme.id} alt={meme.name} src={meme.url}
                                                    onClick={() => {
                                                        setMeme(meme)
                                                    }} />
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div > :
                    <></>
                }
                {meme && Hidden1 &&
                    <>

                        <div id="photo" className="row meme-row justify-content-center align-items-center text-center pt-5 mx-0">
                                <img className="meme" key={meme.id} alt={meme.name} src={meme.url} />
                            {/* <img className="meme" key={meme.id} alt={meme.name} src={meme.url} /> */}
                            <h2 hidden={Hidden} className="top-h2">{topText}</h2>
                            <h2 hidden={Hidden} className="bottom-h2">{bottomText}</h2>
                        </div>
                        <div className="row justify-content-center align-items-center text-center mt-5 mx-0">
                            <form className='justify-content-center align-items-center text-center form'>

                                <button
                                    className='btn btn-primary btn-meme mt-2 mb-5 w-100'
                                    type='button'
                                    onClick={()=>download()}
                                >
                                    Download
                                </button>
                                <FacebookShareButton
                                    url={meme.url}
                                    quote={"Downloaded meme"}
                                    hashtag="#React"
                                >
                                    <FacebookIcon logoFillColor="white" round={true}>
                                    </FacebookIcon>
                                </FacebookShareButton>
                                <WhatsappShareButton
                                    title="Hey! Check out the meme created by me on meme generator"
                                    url={meme.url}
                                >
                                    <WhatsappIcon logoFillColor="white" round={true}>
                                    </WhatsappIcon>
                                </WhatsappShareButton>
                            </form>
                        </div>
                    </>
                }
            </div>

        </>
    );


}