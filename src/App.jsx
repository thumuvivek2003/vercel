import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Text,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (input.trim() === '') return;
    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? input : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, input]);
    }
    setInput('');
  };

  const handleEdit = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Box textAlign="center" p={5}>
      <Text fontSize="2xl" mb={4}>To-Do List</Text>
      <VStack spacing={4}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <Button onClick={handleAdd} colorScheme={editIndex !== null ? 'teal' : 'blue'}>
          {editIndex !== null ? 'Update' : 'Add'}
        </Button>
        <List spacing={3} width="100%">
          {todos.map((todo, index) => (
            <ListItem key={index} display="flex" alignItems="center" justifyContent="space-between">
              <Text>{todo}</Text>
              <Box>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEdit(index)}
                  aria-label="Edit"
                  mr={2}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(index)}
                  aria-label="Delete"
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}

export default App;
