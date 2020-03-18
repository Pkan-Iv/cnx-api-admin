import React, { useState } from 'react'

export default function FormCheckbox({

}) {
  const [checked, setChecked] = useState(false)

  const handleCheck = (e) => {
    setChecked(e.target.checked)
  }
  return (
    <CheckBox
      checked={checked}
      onChange={handleCheck}
    />
  )
}
