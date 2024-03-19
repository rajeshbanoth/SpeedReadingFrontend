import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, Button, Typography, Slider, MenuItem, FormControl, Select, Box, Grid, TextareaAutosize, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const windowSizes = [
  { width: 200, height: 200, label: '200 x 200' },
  { width: 300, height: 300, label: '200 x 200' },
  { width: 400, height: 400, label: '400 x 400' },
  { width: 900, height: 700, label: '900 x 700' },
  { width: 1200, height: 800, label: '1200 x 800' },
  { width: 1600, height: 900, label: '1600 x 900' },
  // Add more window size options as needed
];
const chunkSizes = [1, 2, 3, 4, 5, 6]; // Chunk sizes available in the dropdown
const alignments = ['left', 'center', 'right']; // Text alignment options

const SettingsConfiguration = ({onSettingsChange, settings,handlePastedContent }) => {

    const [pastedText, setPastedText] = useState('');
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openTextDialog, setOpenTextDialog] = useState(false);

  const handleOpenSettingsDialog = () => {
    setOpenSettingsDialog(true);
  };

  const handleCloseSettingsDialog = () => {
    setOpenSettingsDialog(false);
  };

  const handleOpenTextDialog = () => {
    setOpenTextDialog(true);
  };

  const handleCloseTextDialog = () => {
    setOpenTextDialog(false);
  };

  const handlePaste = (event) => {
    const pastedText = event.target.value;
    setPastedText(pastedText);
  };

  const handleUsePastedText = () => {
    const trimmedText = pastedText.trim(); // Remove leading and trailing spaces
    if (trimmedText !== "") { // Check if trimmedText has any content
      handlePastedContent('text', trimmedText);
    }
    // Pass the contentText state to TextDisplay
    handleCloseTextDialog();
  };
  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'windowSize') {
      const [width, height] = value.split('x').map(str => parseInt(str.trim(), 10));
      onSettingsChange('windowWidth', width);
      onSettingsChange('windowHeight', height);
    } else {
      onSettingsChange(name || 'readingSpeed', value);
    }
  };

  return (
    <>
     <Tooltip title="Settings">
     <IconButton onClick={handleOpenSettingsDialog} aria-label="settings">
        <SettingsIcon style={{color:'#F4B400'}} />
      </IconButton>
     </Tooltip>

      <Dialog open={openSettingsDialog} onClose={handleCloseSettingsDialog}>
        <DialogTitle>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={handleCloseSettingsDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box py={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Font Size</Typography>
                <Slider
                  name="fontSize"
                  value={settings.fontSize}
                  min={12}
                  max={72}
                  step={2}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Font Color</Typography>
                <TextField
                  name="fontColor"
                  type="color"
                  value={settings.fontColor}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Background Color</Typography>
                <TextField
                  name="backgroundColor"
                  type="color"
                  value={settings.backgroundColor}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Reading Mode</Typography>
                <FormControl fullWidth variant="outlined">
                  <Select
                    name="readingMode"
                    value={settings.readingMode}
                    onChange={handleChange}
                  >
                    <MenuItem value="single-word">Single Word</MenuItem>
                    <MenuItem value="rsvp">RSVP</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Reading Speed (words per minute)</Typography>
                <Slider
                  name="readingSpeed"
                  value={settings.readingSpeed}
                  min={50}
                  max={1000}
                  step={10}
                  onChange={handleChange}
                  valueLabelDisplay="auto" // Show value label while sliding
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Window Size</Typography>
                <FormControl fullWidth variant="outlined">
                  <Select
                    name="windowSize"
                    value={`${settings.windowWidth} x ${settings.windowHeight}`}
                    onChange={handleChange}
                  >
                    {windowSizes.map(size => (
                      <MenuItem key={`${size.width}x${size.height}`} value={`${size.width} x ${size.height}`}>
                        {size.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Chunk Size (words)</Typography>
                <FormControl fullWidth variant="outlined">
                  <Select
                    name="chunkSize"
                    value={settings.chunkSize}
                    onChange={handleChange}
                  >
                    {chunkSizes.map(size => (
                      <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Text Alignment</Typography>
                <FormControl fullWidth variant="outlined">
                  <Select name="textAlignment" value={settings.textAlignment} onChange={handleChange}>
                    {alignments.map((alignment) => (
                      <MenuItem key={alignment} value={alignment}>
                        {alignment}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
      <Tooltip title="Add Your Own Text">
      <IconButton onClick={handleOpenTextDialog} aria-label="pasteText">
      
        <EditIcon style={{color:'#0F9D58'}} />
       
       
      </IconButton>
      </Tooltip>
      <Dialog open={openTextDialog} onClose={handleCloseTextDialog} minWidth="xl" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Paste or Type Text</Typography>
          <IconButton onClick={handleCloseTextDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={10}
                placeholder="Paste or type your text here"
                value={pastedText}
                onChange={handlePaste}
                variant="outlined"
                fullWidth
                style={{ marginBottom: '16px' }} // Add margin bottom for spacing
              />
              <Button variant="contained" color="primary" onClick={handleUsePastedText}>OK</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SettingsConfiguration;
