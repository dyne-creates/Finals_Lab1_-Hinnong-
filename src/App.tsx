import Feedback from './components/Feedback'
import './App.css'

function App() {

  return (
    <>
      <Feedback />
    </>
  )
}

export default App

// Sample Post
// app.post("/feedback", async (req, res) => {
//     try {
//         const feedback = await Feedback.create(req.body);
//         res.json({ message: "Feedback sent successfully", feedback });
//     } catch (err) {
//         res.status(500).json({ error: err.message });


//     }
// }); 
