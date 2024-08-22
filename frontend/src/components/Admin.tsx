// src/pages/CoordinateManager.tsx
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const CoordinateManager: React.FC = () => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Array<any>>([]);

  // 组件加载时获取坐标
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get("/api/coordinates");
        setCoordinates(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("查询坐标失败", error);
        setCoordinates([]); // 失败时也确保是空数组
      }
    };

    fetchCoordinates();
  }, []);

  // 添加坐标
  const addCoordinate = async () => {
    try {
      const newCoordinate = { latitude, longitude, description };
      await axios.post("/api/coordinates", newCoordinate);
      const response = await axios.get("/api/coordinates");
      setCoordinates(Array.isArray(response.data) ? response.data : []);
      setLatitude("");
      setLongitude("");
      setDescription("");
    } catch (error) {
      console.error("添加坐标失败", error);
    }
  };

  // 删除坐标
  const deleteCoordinate = async (id: string) => {
    try {
      await axios.delete(`/api/coordinates/${id}`);
      const response = await axios.get("/api/coordinates");
      setCoordinates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("删除坐标失败", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ backgroundColor: "#cfe8fc" }}>
      <Typography variant="h4" gutterBottom>
        Coordinate Manager
      </Typography>
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <Typography variant="h6">Add New Coordinate</Typography>
        <TextField
          label="Latitude"
          variant="outlined"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          style={{ marginRight: 8, marginBottom: 16 }}
        />
        <TextField
          label="Longitude"
          variant="outlined"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          style={{ marginRight: 8, marginBottom: 16 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: 8, marginBottom: 16 }}
        />
        <Button variant="contained" color="primary" onClick={addCoordinate}>
          Add Coordinate
        </Button>
      </Paper>
      <Typography variant="h6" gutterBottom>
        Coordinates List
      </Typography>
      <List>
        {coordinates.map((coordinate: any) => (
          <ListItem
            key={coordinate._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteCoordinate(coordinate._id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`}
              secondary={coordinate.description}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CoordinateManager;
