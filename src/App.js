import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Explore } from "./pages/Explore";
import { Home } from "./pages/Home";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";
import { Widgets } from "./components/Widgets";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { CreatePost } from "./pages/CreatePost";
import { EditBio } from "./components/EditBio";
import { Following } from "./components/Following";
import { Followers } from "./components/FollowersList";
import { MobileNav } from "./components/MobileNav";

function App(){
    return (
        <div className="bg-gray-100 min-h-screen text-d-blue mb-16">
            <Header/>

            <div className="custom-container flex justify-between">
                <Sidebar/>
                
                <Routes>
                    <Route 
                        path="/" 
                        element={ 
                            <PrivateRoute>
                                <Home/> 
                            </PrivateRoute>
                        } 
                    />

                    <Route 
                        path="/explore" 
                        element={
                            <PrivateRoute>
                                <Explore/>
                            </PrivateRoute>
                        } 
                    />

                    <Route 
                        path="/notifications" 
                        element={ 
                            <PrivateRoute>
                                <Notifications/> 
                            </PrivateRoute>
                        }
                    />

                    <Route 
                        path="/profile/:profileId"
                        element={ 
                            <PrivateRoute>
                                <Profile/> 
                            </PrivateRoute>
                        } 
                    />

                    <Route
                        path="/post"
                        element={
                            <PrivateRoute>
                                <CreatePost/>
                            </PrivateRoute>
                        }
                    />

                    <Route path="/login" element={ <Login/> } />
                    <Route path="/signup" element={ <Signup/> } />
                    <Route path="/editBio" element={ <EditBio/> } />
                    <Route path="/following/:profileId" element={ <Following/> } />
                    <Route path="/followers/:profileId" element={ <Followers/> } />

                </Routes>
                <Widgets/>
                
            </div>
            <MobileNav/>
        </div>
    );
}

export default App;