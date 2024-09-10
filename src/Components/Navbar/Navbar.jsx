import React, { useEffect, useState } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import { Link } from 'react-router-dom'
import omkar from '../../assets/download.png'
import youtube from '../../assets/Youtube-transperent.png'
// import searchIcon from '../../assets/searchicon1.png'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';




const Navbar = ({ setSidebar}) => {

    const sidebar_toggle = (e) => {
        setSidebar((prev) => prev === false ? true : false);
    }

// ------------------- search
    const [search, setSearch]=useState("")
    const [searchData, setSearchData]=useState([])
    const [selectedItem, setselectedItem] = useState(-1)


    const handleChange=e=>{
        setSearch(e.target.value)
    }

    const handleClose=()=>{
        setSearch("")
        setSearchData([])
    }

    const handleKeyDown = e =>{
        if(e.key==="ArrowUp" && selectedItem > 0)
        {
            setselectedItem(prec => prev -1)
        }
        else if(e.key==="ArrowDown" && selectedItem < searchData <searchData.length-1)
        {
            setselectedItem(prev => prev +1)
        }
        else if(e.key==="Enter" && selectedItem >= 0){
            window.open(searchData[selectedItem].show.url)
        }
    }


//https://www.youtube.com/results?search_query=
    useEffect(()=>{
        if(search!=="")
        {
            fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
            .then(res=>res.json())
            .then(data=>setSearchData(data))
        }
    },[search])

       



//--------------------
    return (
        <nav className='flex-div'>
            <div className="nav-left flex-div">
                <img src={menu_icon} alt="" className="menu-icon" onClick={sidebar_toggle} />
                <Link to='/'> <img src={youtube} alt="" className="logo" /></Link>
            </div>

{/* Search Bar made */}
<div>
              <section className='search_section'>
        <div className="search_input_div">
            <input
            className='search_input'
            placeholder='Search...'
            autoComplete='off'
            type="text" 
            onChange={handleChange}
            value={search}
            onKeyDown={handleKeyDown}/>
            {
                    search===""?<SearchIcon/>:<CloseIcon onClick={handleClose}/>
                }
        </div>

           


            <div className="search_result">
                {
                    searchData.map((data, index)=>{
                        return <a href={data.show.url} key={index} target='_blank' className={selectedItem === index?'search_suggestion_line active':
                        'search_suggestion_line'
                        }>
                        {data.show.name}
                    </a>
                    })
                }
                
            </div>
      
    </section>
</div>


            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" className='upload_icon' />
                <img src={more_icon} alt="" className='more_icon' />
                <img src={notification_icon} className='notification_icon' alt="" />
                <Link to="https://www.youtube.com/account"><img src={omkar} alt="" className="user-icon" /></Link>
            </div>
        </nav>
    )
}
// https://www.youtube.com/account
export default Navbar
