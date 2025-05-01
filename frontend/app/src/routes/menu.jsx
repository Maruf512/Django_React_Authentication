import { VStack, Heading, Text, Button } from '@chakra-ui/react'

import { use, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { get_notes, logout } from '../endpoints/api'

const Menu = () => {

  const [notes, setNotes] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    const getNotes = async () => {
      const notes = await get_notes()
      setNotes(notes)
    }
    getNotes()
  }, [])


  const handleLogout = () => {
    const success = logout()
    if (success) {
      nav('/login')
    }
  }



  return (
    <VStack>
      <Heading>Welcome back user</Heading>
      <VStack>
        {notes.map((note) => {
          return <Text>{note.description}</Text>
        })}
      </VStack>
      <Button onClick={handleLogout} colorScheme='red'>Logout</Button>
    </VStack>
  )
}

export default Menu
