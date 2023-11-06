import React from 'react'

const UserAccountButtons = ({item}) => {
    const duedate = new Date (item.duedatems)

    return (
        <>
            <button onClick={() => console.log(duedate)} className='bg-[#29E3B6] text-white px-4 py-2 rounded-md w-full'>
                Due {duedate.getMonth() + 1 + "-" + duedate.getDate() + "-" + duedate.getFullYear()}
            </button>
        </>
    )
}

export default UserAccountButtons