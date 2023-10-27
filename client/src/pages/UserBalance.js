import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-scroll'
import { FaSearch } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { loadStripe } from "@stripe/stripe-js";
import UserNavbar from '../components/UserNavbar';
import axios from 'axios';

const UserBalance = () => {
    // Variables
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [itemtitle, setItemtitle] = useState(false);
    const [productid, setProductid] = useState("");
    const [filter, setFilter] = useState("All Balances"); 
    const [balance, setBalance] = useState([]);
    const books = balance.filter(item => item.type === "Book");
    const media = balance.filter(item => item.type === "Media");
    const devices = balance.filter(item => item.type === "Device");
    const { currentAuthenticatedId, setCurrentCart } = useContext(AuthContext);

    // Get All Users Fees From Balances
    useEffect(() => {
        const getAllFees = async () => {
            axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/balance", {
                borrowerid: currentAuthenticatedId,
            }).then((response) => {
                console.log(response.data);
                setBalance(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
        getAllFees();
    }, [currentAuthenticatedId]);


    // Stripe Variables and Functions
    let stripePromise;

    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe('pk_test_51NgdibDZDYGFl6V32iJVehtrydH9squ4srVn2F8RVLcLs0PkegcLUUaJRPmDrrQjhAO6cac4ANJWeImGH5l5pZZ1001b6ybKCf');
        }
        return stripePromise;
    };

    const checkoutOptions = {
        lineItems: [{ 
            price: productid, 
            quantity: 1 
        }],
        mode: "payment",
        successUrl: `${window.location.origin}/success`, 
        cancelUrl: `${window.location.origin}/user-dashboard-balance`,
    };

    const redirectToCheckout = async () => {
        console.log("redirectToCheckout")
        const stripe = await getStripe()
        stripe.redirectToCheckout(checkoutOptions)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <div>
            <UserNavbar />
            <div className="flex flex-col mx-6">
                {/* Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <button onClick={() => setFilter("All Balances")} className={`${filter === "All Balances" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> All Balances </button>
                        <button onClick={() => setFilter("Books")} className={`${filter === "Books" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Books </button>
                        <button onClick={() => setFilter("Media")} className={`${filter === "Media" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Media </button>
                        <button onClick={() => setFilter("Devices")} className={`${filter === "Devices" ? "bg-[#00BBFF]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md`}> Devices </button>
                    </div>
                    <div className="flex gap-6">
                        <FaSearch size={25} color='black' onClick={() => setShowSearchModal(true)} className="hover:cursor-pointer"/>
                    </div>
                </div>
                
                {/* Empty Content */}
                {filter === "All Balances" && balance.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Items </p>
                    </div>
                )}

                {filter === "Books" && books.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Books </p>
                    </div>
                )}

                {filter === "Media" && media.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Media </p>
                    </div>
                )}

                {filter === "Devices" && devices.length === 0 && (
                    <div className="flex items-center justify-center w-full my-10">
                        <p> No Devices </p>
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-10 my-10">
                    {/* Show All Balances */}
                    {filter === "All Balances" && (
                        <>
                            {balance.map((fee) => (
                                <div name={fee.feeid} key={fee.feeid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {fee.type[0]}</p>
                                    <p className="flex w-1/5"> {fee.title}</p>
                                    <p className="flex w-1/5"> ${fee.lateamount}.00 </p>
                                    <p className="flex w-1/5"> ${fee.damagedamount}.00 </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onPointerOver={() => {
                                            setProductid(fee.productid);
                                            setCurrentCart(fee.feeid);
                                        }
                                        } onClick={() => {
                                            redirectToCheckout()
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'> Pay ${fee.lateamount + fee.damagedamount}.00 </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Books */}
                    {filter === "Books" && (
                        <>
                            {books.map((fee) => (
                                <div name={fee.feeid} key={fee.feeid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {fee.type[0]}</p>
                                    <p className="flex w-1/5"> {fee.title}</p>
                                    <p className="flex w-1/5"> ${fee.lateamount}.00 </p>
                                    <p className="flex w-1/5"> ${fee.damagedamount}.00 </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onPointerOver={() => {
                                            setProductid(fee.productid);
                                            setCurrentCart(fee.feeid);
                                        }
                                        } onClick={() => {
                                            redirectToCheckout()
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'> Pay ${fee.lateamount + fee.damagedamount}.00 </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Media */}
                    {filter === "Media" && (
                        <>
                            {media.map((fee) => (
                                <div name={fee.feeid} key={fee.feeid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {fee.type[0]}</p>
                                    <p className="flex w-1/5"> {fee.title}</p>
                                    <p className="flex w-1/5"> ${fee.lateamount}.00 </p>
                                    <p className="flex w-1/5"> ${fee.damagedamount}.00 </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onPointerOver={() => {
                                            setProductid(fee.productid);
                                            setCurrentCart(fee.feeid);
                                        }
                                        } onClick={() => {
                                            redirectToCheckout()
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'> Pay ${fee.lateamount + fee.damagedamount}.00 </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show All Devices */}
                    {filter === "Devices" && (
                        <>
                            {devices.map((fee) => (
                                <div name={fee.feeid} key={fee.feeid} className='flex items-center justify-between gap-10'>
                                    <p className="bg-[#E1EAFF] h-12 w-12 rounded-full flex justify-center items-center"> {fee.type[0]}</p>
                                    <p className="flex w-1/5"> {fee.title}</p>
                                    <p className="flex w-1/5"> ${fee.lateamount}.00 </p>
                                    <p className="flex w-1/5"> ${fee.damagedamount}.00 </p>
                                    <div className="flex justify-between w-1/5 gap-2">
                                        <button onPointerOver={() => {
                                            setProductid(fee.productid);
                                            setCurrentCart(fee.feeid);
                                        }
                                        } onClick={() => {
                                            redirectToCheckout()
                                        }} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'> Pay ${fee.lateamount + fee.damagedamount}.00 </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Search Modal */}
            {showSearchModal && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                    <div className="flex flex-col items-center justify-center w-1/3 pb-10 bg-white bg-opacity-100 rounded-lg">
                        <div className="flex justify-end w-full p-4">
                            <FaXmark size={25} color="black" onClick={() => setShowSearchModal(false)} className="hover:cursor-pointer"/>
                        </div>
                        <input type="text" className="w-3/4 h-10 px-2 my-2 bg-gray-200 rounded-md" placeholder="Title" onChange={(e) => setItemtitle(e.target.value)}/>
                        <button className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md "> 
                            <Link to={itemtitle} smooth duration={500} onClick={() => setShowSearchModal(false)}>
                                Search 
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserBalance