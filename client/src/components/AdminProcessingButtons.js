import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid';
import axios from 'axios';

const AdminProcessingButtons = ({item}) => {
    const [isDamaged, setIsDamaged] = useState(false);
    const [lateStatus, setLateStatus] = useState("");
    const duedate = new Date(item.duedatems).getTime();
    const currentdate = new Date().getTime();
    const dayscalculation = (currentdate - duedate) / 86400000;
    

    useEffect(() => {
        if (Math.round(dayscalculation) <= 0) {
            setLateStatus(`Not Late`)
        } else {
            setLateStatus(`Overdue By ${Math.round(dayscalculation)} Days`)
        }
    }, [dayscalculation])

    
    // Approve An Item
    const approveItem = async () => {
        let lateamount = 0;
        let damagedamount = 0;
        let productid = "";

        if (Math.round(dayscalculation) > 0 || isDamaged === true) {
            // Calculate Late Fees
            if (Math.round(dayscalculation) > 14) {
                lateamount = 300;
                damagedamount = 0;
            } else if (Math.round(dayscalculation) > 0){
                lateamount = Math.round(dayscalculation) * 3
            }

            // Calculate Damaged Fees
            if (isDamaged && item.type === "Book") {
                damagedamount = 50;
            } else if (isDamaged === true && item.type === "Media") {
                damagedamount = 100;
            } else if (isDamaged === true && item.type === "Device") {
                damagedamount = 150;
            }

            // Determine Product ID
            if (lateamount + damagedamount === 3) {
                productid = "price_1O8CVVDZDYGFl6V3AlnxqcRd";
            } 
            
            else if (lateamount + damagedamount === 6) {
                productid = "price_1O8CWCDZDYGFl6V3Xiv6HKoh";
            }

            else if (lateamount + damagedamount === 9) {
                productid = "price_1O8CWfDZDYGFl6V3BW2hKFXK";
            }

            else if (lateamount + damagedamount === 12) {
                productid = "price_1O8CXWDZDYGFl6V3EzurR8Hz";
            }

            else if (lateamount + damagedamount === 15) {
                productid = "price_1O8CY6DZDYGFl6V3V4L6cNIO";
            }

            else if (lateamount + damagedamount === 18) {
                productid = "price_1O8CYZDZDYGFl6V3nd4Nbq0K";
            }

            else if (lateamount + damagedamount === 21) {
                productid = "price_1O8CZJDZDYGFl6V3adANLb4T";
            }

            else if (lateamount + damagedamount === 24) {
                productid = "price_1O8CZdDZDYGFl6V3AOn6xqhn";
            }

            else if (lateamount + damagedamount === 27) {
                productid = "price_1O8Ca5DZDYGFl6V3lBrk5Umj";
            }

            else if (lateamount + damagedamount === 30) {
                productid = "price_1O8CacDZDYGFl6V39Cg6SIVn";
            }

            else if (lateamount + damagedamount === 33) {
                productid = "price_1O8Cb0DZDYGFl6V3IE4cMj3k";
            }

            else if (lateamount + damagedamount === 36) {
                productid = "price_1O8CbHDZDYGFl6V3XNaeBwPC";
            }

            else if (lateamount + damagedamount === 39) {
                productid = "price_1O8CbfDZDYGFl6V3CY7kEoCM";
            }

            else if (lateamount + damagedamount === 42) {
                productid = "price_1O8CcLDZDYGFl6V3UiEvuV3a";
            }

            else if (lateamount + damagedamount === 53) {
                productid = "price_1O8CfwDZDYGFl6V3FXzlnEDD";
            }

            else if (lateamount + damagedamount === 56) {
                productid = "price_1O8CgUDZDYGFl6V3mVT5zvXb";
            }

            else if (lateamount + damagedamount === 59) {
                productid = "price_1O8ChNDZDYGFl6V3ou1YSenF";
            }

            else if (lateamount + damagedamount === 62) {
                productid = "price_1O8ChtDZDYGFl6V3GbxAhcqq";
            }

            else if (lateamount + damagedamount === 65) {
                productid = "price_1O8CiSDZDYGFl6V3fi2lnlOi";
            }

            else if (lateamount + damagedamount === 68) {
                productid = "price_1O8CirDZDYGFl6V3b9jzlSWX";
            }

            else if (lateamount + damagedamount === 71) {
                productid = "price_1O8CjMDZDYGFl6V340eQ10Wl";
            }

            else if (lateamount + damagedamount === 74) {
                productid = "price_1O8CjyDZDYGFl6V30NeND8zR";
            }

            else if (lateamount + damagedamount === 77) {
                productid = "price_1O8CkhDZDYGFl6V3cFxAwLfz";
            }

            else if (lateamount + damagedamount === 80) {
                productid = "price_1O8ClADZDYGFl6V3oRkAmoEt";
            }

            else if (lateamount + damagedamount === 83) {
                productid = "price_1O8ClaDZDYGFl6V3lghSp9fd";
            }

            else if (lateamount + damagedamount === 86) {
                productid = "price_1O8Cm8DZDYGFl6V3zL2pPcmF";
            }

            else if (lateamount + damagedamount === 89) {
                productid = "price_1O8CmTDZDYGFl6V3405hvdFI";
            }

            else if (lateamount + damagedamount === 92) {
                productid = "price_1O8CnMDZDYGFl6V32RS068hf";
            }

            else if (lateamount + damagedamount === 103) {
                productid = "price_1O8DBoDZDYGFl6V36hzdqr6N";
            }

            else if (lateamount + damagedamount === 106) {
                productid = "price_1O8DCxDZDYGFl6V3Us6eTNEm";
            }

            else if (lateamount + damagedamount === 109) {
                productid = "price_1O8DElDZDYGFl6V31KZV7qAE";
            }

            else if (lateamount + damagedamount === 112) {
                productid = "price_1O8DFKDZDYGFl6V305iYBvYK";
            }

            else if (lateamount + damagedamount === 115) {
                productid = "price_1O8DFnDZDYGFl6V3nlJoUzqW";
            }

            else if (lateamount + damagedamount === 118) {
                productid = "price_1O8DGXDZDYGFl6V3WBrSAQU9";
            }

            else if (lateamount + damagedamount === 121) {
                productid = "price_1O8DH3DZDYGFl6V31IO3OXWs";
            }

            else if (lateamount + damagedamount === 124) {
                productid = "price_1O8DHjDZDYGFl6V3AZ4Imfx0";
            }

            else if (lateamount + damagedamount === 127) {
                productid = "price_1O8DI5DZDYGFl6V3TRkEjDwx";
            }

            else if (lateamount + damagedamount === 130) {
                productid = "price_1O8DIXDZDYGFl6V350z3M0Kw";
            }

            else if (lateamount + damagedamount === 133) {
                productid = "price_1O8DIuDZDYGFl6V3TEgz8Me7";
            }

            else if (lateamount + damagedamount === 136) {
                productid = "price_1O8DJFDZDYGFl6V392Qpgl68";
            }

            else if (lateamount + damagedamount === 139) {
                productid = "price_1O8DJYDZDYGFl6V31BQPx9RL";
            }

            else if (lateamount + damagedamount === 142) {
                productid = "price_1O8DJuDZDYGFl6V3ua3J2UrC";
            }

            else if (lateamount + damagedamount === 153) {
                productid = "price_1O8DO2DZDYGFl6V3Ul7e0mWq";
            }

            else if (lateamount + damagedamount === 156) {
                productid = "price_1O8DOpDZDYGFl6V3kiQzwsfq";
            }

            else if (lateamount + damagedamount === 159) {
                productid = "price_1O8DSbDZDYGFl6V3wqZ6idPZ";
            }

            else if (lateamount + damagedamount === 162) {
                productid = "price_1O8DSxDZDYGFl6V3mWu5UMYU";
            }

            else if (lateamount + damagedamount === 165) {
                productid = "price_1O8DU0DZDYGFl6V3tCg3Yq1U";
            }

            else if (lateamount + damagedamount === 168) {
                productid = "price_1O8DUWDZDYGFl6V3MG4vSyG4";
            }

            else if (lateamount + damagedamount === 171) {
                productid = "price_1O8DUtDZDYGFl6V3P36BBBNR";
            }

            else if (lateamount + damagedamount === 174) {
                productid = "price_1O8DVUDZDYGFl6V3bcVETP6r";
            }

            else if (lateamount + damagedamount === 177) {
                productid = "price_1O8DWCDZDYGFl6V3ZeZp1Rq7";
            }

            else if (lateamount + damagedamount === 180) {
                productid = "price_1O8DWmDZDYGFl6V3LF0Pw1cb";
            }

            else if (lateamount + damagedamount === 183) {
                productid = "price_1O8DXDDZDYGFl6V3s3qarsy7";
            }

            else if (lateamount + damagedamount === 186) {
                productid = "price_1O8DXyDZDYGFl6V3RcMytQDi";
            }

            else if (lateamount + damagedamount === 189) {
                productid = "price_1O8DYQDZDYGFl6V3CofwZMTg";
            }

            else if (lateamount + damagedamount === 192) {
                productid = "price_1O8DczDZDYGFl6V35wkeuAYp";
            }

            else if (lateamount + damagedamount === 300) {
                productid = "price_1O8Dg9DZDYGFl6V3NwArGvZz";
            }

            else if (lateamount + damagedamount === 50) {
                productid = "price_1O8DlsDZDYGFl6V3hZrRBQMq";
            }

            else if (lateamount + damagedamount === 100) {
                productid = "price_1O8DmRDZDYGFl6V3BIcpmFUN";
            }

            else if (lateamount + damagedamount === 150) {
                productid = "price_1O8DmmDZDYGFl6V3prFTtj4k";
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
            <button className={`${dayscalculation > 0 ? "bg-[#DFA01F]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-full flex justify-center items-center`}> {lateStatus} </button>
            <button onClick={() => setIsDamaged(!isDamaged)} className={`${isDamaged ? "bg-[#DFA01F]" : "bg-[#7C829D]"} text-white px-4 py-2 rounded-md w-full flex justify-center items-center`}> Damaged </button>
            <button onClick={() => approveItem(item)} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full flex justify-center items-center'> Approve </button>
        </>
    )
}

export default AdminProcessingButtons