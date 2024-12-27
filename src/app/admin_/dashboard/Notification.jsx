import React from 'react'

const Notification = () => {
  return (
    <div>
      <p className='bg-red-100 text-base rounded-md text-red-700 p-5'>
        <strong>Note:</strong> To avoid being logged out of your current
        session, please refrain from navigating to the main website in the same
        browser session. Use a separate browser or an incognito/private window
        if you need to access the main website.
      </p>
    </div>
  )
}

export default Notification
