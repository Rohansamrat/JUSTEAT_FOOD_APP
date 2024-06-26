import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'
import Card from '../components/Card.js'
import '../App.css';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

  

    useEffect(() => {
        const loadData = async () => {

            try{
                
               await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/foodData`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(async (res) => {
                    let response = await res.json();
                    // console.log(response)
                    //  setOrderData(response);
                    setFoodItem(response[0]);
                    setFoodCat(response[1]);
                })
              
                // response = await response.json();
               

            }catch(err){
                console.log(err);
            }

            // console.log(response[0],response[1], '')
        };

        
        loadData();
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ Objectfit: "contain !! important" }}>

                <div className="carousel-inner " id='carousel'>
                    <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                        <div className=" d-flex justify-content-center">
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            <button className="btn text-white bg-success" type="submit">Search</button>
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className='container'>
                
                {
                    foodCat?.length !== 0
                        ? foodCat?.map((data) => {
                            return (
                            
                            <div className='row mb-3' >
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem != [] ? foodItem.filter((item) => (item.CategoryName == data.CategoryName)  && (item.name.toLowerCase().includes(search.toLowerCase())))
                                    ?.map(filterItems => {
                                        return (
                                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                <Card foodItem = {filterItems}
                                                    options={filterItems.options[0]}
                                                   ></Card>
                                            </div>
                                        )
                                    }) : <div>No Such Data Found</div>}
                            </div>
                            )
                        })
                        : <div></div>
                }
            </div>

            <div><Footer /></div>
        </div>
    )
}
