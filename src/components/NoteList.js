import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Collapse,
  styled,
} from '@mui/material';
import { getDummyNotes } from '../api';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const TitleTypography = styled(Typography)({
  fontWeight: 600,
});

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedNote, setExpandedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getDummyNotes();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteClick = (noteId) => {
    if (expandedNote === noteId) {
      setExpandedNote(null);
    } else {
      setExpandedNote(noteId);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div">
            Welcome to the Dummy Notes
          </Typography>
        </Toolbar>
      </AppBar>
      <Box p={5}>
        {notes.map((note) => (
          <Box
            key={note.id}
            my={2}
            p={2}
            borderRadius={8}
            boxShadow={3}
            bgcolor="rgb(0,0,0)"
            sx={{
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}npm 
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <TitleTypography variant="h6" gutterBottom color="primary.main">
                Title: {note.title}
              </TitleTypography>
              <IconButton onClick={() => handleNoteClick(note.id)}>
                {expandedNote === note.id ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
              </IconButton>
            </Box>
            <Collapse in={expandedNote === note.id}>
              <Box mt={2} bgcolor="#F8F8F8" p={2} borderRadius={8}>
                <Typography variant="subtitle1" gutterBottom color="text.secondary">
                  Category name: {note.category}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  User: {note.user}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NoteList;