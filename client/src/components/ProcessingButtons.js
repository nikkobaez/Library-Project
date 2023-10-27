import React, { useState } from 'react'
import uuid from 'react-uuid';
import axios from 'axios';

const ProcessingButtons = ({item}) => {
    const [isLate, setIsLate] = useState(false);
    const [isDamaged, setIsDamaged] = useState(false)
    
    // Approve An Item
    const approveItem = async (item) => {
        let lateamount = 0;
        let damagedamount = 0;
        let productid = "";

        if (isLate === true || isDamaged === true) {
            if (isLate === true && item.type === "Book") {
                lateamount = 10;
            } else if (isLate === true && item.type === "Media") {
                lateamount = 15;
            } else if (isLate === true && item.type === "Device") {
                lateamount = 20;
            }
    
            if (isDamaged && item.type === "Book") {
                damagedamount = 50;
            } else if (isDamaged === true && item.type === "Media") {
                damagedamount = 100;
            } else if (isDamaged === true && item.type === "Device") {
                damagedamount = 150;
            }

            if (lateamount + damagedamount === 10) {
                productid = "price_1O5O8BDZDYGFl6V3iD0tZmaV";
            } else if (lateamount + damagedamount === 15) {
                productid = "price_1O5O8kDZDYGFl6V3GSoWgmtB";
            } else if (lateamount + damagedamount === 20) {
                productid = "price_1O5O8TDZDYGFl6V3PMbAmf2q";
            } else if (lateamount + damagedamount === 50) {
                productid = "price_1O5O9fDZDYGFl6V38uFsQOgq";
            } else if (lateamount + damagedamount === 100) {
                productid = "price_1O5O9yDZDYGFl6V35ba6wjus";
            } else if (lateamount + damagedamount === 150) {
                productid = "price_1O5OALDZDYGFl6V39H3q3ons";
            } else if (lateamount + damagedamount=== 60) {
                productid = "price_1O5OAlDZDYGFl6V3jf0fCgb8";
            } else if (lateamount + damagedamount=== 115) {
                productid = "price_1O5OBZDZDYGFl6V36cCWaonC";
            } else if (lateamount + damagedamount === 170) {
                productid = "price_1O5OCWDZDYGFl6V3pn85CzCS";
            }

            axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/addtobalance", {
                feeid: uuid(),
                borrowerid: item.borrowerid,
                name: item.name,
                itemid: item.itemid,
                title: item.title,
                type: item.type,
                lateamount: lateamount,
                damagedamount: damagedamount,
                productid: productid,
            }).then((response) => {
                axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/addtoavailable", {
                    itemid: item.itemid,
                    title: item.title,
                    author: item.author,
                    cover: item.cover,
                    type: item.type,
                }).then((response) => {
                    axios.delete("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/processing/" + item.processingid)
                    .then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        console.log(error);
                    });
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error)
            })
        } else {
            axios.post("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/addtoavailable", {
                itemid: item.itemid,
                title: item.title,
                author: item.author,
                cover: item.cover,
                type: item.type,
            }).then((response) => {
                axios.delete("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/processing/" + item.processingid)
                .then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <>
            <button onClick={() => setIsLate(!isLate)} className={`${isLate ? "bg-[#DFA01F]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/3 flex justify-center items-center`}> Late </button>
            <button onClick={() => setIsDamaged(!isDamaged)} className={`${isDamaged ? "bg-[#DFA01F]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-1/3 flex justify-center items-center`}> Damaged </button>
            <button onClick={() => approveItem(item)} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-1/3 flex justify-center items-center'> Approve </button>
        </>
    )
}

export default ProcessingButtons