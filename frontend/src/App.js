import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import { MySkillsPublicPage } from "./components/MySkillsPublicPage";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin";
import {NotFound} from "./components/NotFound";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/admin" element={<Admin/>} />
                    <Route exact path="/" element={<Home/>} />
                    <Route path ="/myskills/:uniquePath" element={<MySkillsPublicPage/>} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
