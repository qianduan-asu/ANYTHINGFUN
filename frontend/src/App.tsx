// src/App.tsx
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "mapbox-gl/dist/mapbox-gl.css";
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <h1>AnythingFun</h1>
//       <Map />
//     </div>
//   );
// };

// export default App;
const App: React.FC = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
