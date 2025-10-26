import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ showLogin , setShowLogin ] = useState(false);
  const [ token, setToken] = useState(localStorage.getItem('token'))

  const [ credit, setCredit] = useState(false)
  // In production (same origin), use relative paths. In dev, use env variable
  const backendUrl = import.meta.env.PROD ? '' : import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();

  const loadCreditData = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/user/credits", 
        {
          headers: {token}
        })
        if(data.success){
          setCredit(data.credits);
          setUser(data.user)
        }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const generateImage = async (prompt) => {
    try {
       const {data} = await axios.post(backendUrl + "/api/image/generate-image", {prompt}, {
        headers: {token}
       })
       if(data.success){
        // Show success message with metadata if available
        if(data.metadata){
          toast.success(`✓ Image generated (${data.metadata.imageSize}KB, ${data.metadata.remainingCredits} credits left)`);
        } else {
          toast.success('Image generated successfully');
        }
        loadCreditData();
        return data.resultImage;
       }else{
        // Handle error with suggestions if available
        const errorMsg = data.suggestions && data.suggestions.length > 0 
          ? `${data.message}\n💡 Try: ${data.suggestions[0]}`
          : data.message;
        
        toast.error(errorMsg);
        loadCreditData();
        if(data.creditBalance === 0){
          navigate('/buy');
        }
        return null;
       }
    } catch (error) {
      console.error('Image generation error:', error);
      
      // Handle different error types with better messages
      let errorMessage = error.response?.data?.message || error.message || 'Failed to generate image';
      
      // Show suggestions if available
      if (error.response?.data?.suggestions && error.response?.data?.suggestions.length > 0) {
        errorMessage = `${errorMessage}\n💡 Suggestion: ${error.response?.data?.suggestions[0]}`;
      }
      
      toast.error(errorMessage);
      loadCreditData();
      
      if (error.response?.data?.creditBalance === 0 || error.response?.status === 400) {
        navigate('/buy');
      }
      
      return null;
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken('');
    setUser(null);
  }

  useEffect(() => {
    if(token){
      loadCreditData();
    }
  }, [token])

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
