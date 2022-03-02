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
import { EditPost } from "./components/EditPost";
import { PostCard } from "./features/post/PostCard";

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
                    <Route 
                        path="/editBio" 
                        element={ 
                            <PrivateRoute>
                                <EditBio/> 
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/following/:profileId" 
                        element={ 
                            <PrivateRoute>
                                <Following/> 
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/followers/:profileId" 
                        element={ 
                            <PrivateRoute>
                                <Followers/> 
                            </PrivateRoute>
                        } 
                    />
                    <Route
                        path="/editPost/:postId"
                        element={
                            <PrivateRoute>
                                <EditPost/>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/post/:postId"
                        element={
                            <PrivateRoute>
                                <PostCard/>
                            </PrivateRoute>
                        }
                    />

                    <Route path="/login" element={ <Login/> } />
                    <Route path="/signup" element={ <Signup/> } />

                </Routes>
                <Widgets/>
                
            </div>
            <MobileNav/>
        </div>
    );
}

export default App;