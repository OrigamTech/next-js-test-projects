import React from 'react'

interface IProps {
  text:string
}
const CopyButton = ({text}:IProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).catch((error) => console.error("failed to copy:",error));
  };

  return (
    <button onClick={copyToClipboard}>Copy</button>
  )
}

export default CopyButton

