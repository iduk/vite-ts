import React from 'react'

interface FooterProps {
  customContent?: React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ customContent }) => {
  return <footer>{customContent}</footer>
}

export default Footer
