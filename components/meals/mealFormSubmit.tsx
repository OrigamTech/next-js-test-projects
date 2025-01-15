"use client";
import {useFormStatus} from 'react-dom'

const MealFormSubmit = () => {
    const status = useFormStatus()
  return (
    <>
        <button disabled={status.pending}>
             {/* it disables the button when we are pending the request */}
            {status.pending ? "submitting..." : "Share Meal"}
        </button>
    </>
  )
}

export default MealFormSubmit